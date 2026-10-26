import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { readStorage, writeStorage } from '../../utils/storage'
import { trackTaskEvent } from '../../utils/analytics'
import { Window, buttonBase } from '../Layout/Page'

interface Task {
  id: string
  text: string
  completed: boolean
}

const STORAGE_KEY = 'pausepad-tasks'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Form = styled.form`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
    min-width: 0;
    height: 48px;
    padding: 0 14px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: ${({ theme }) => theme.radius.md};
    background: #fff;
    color: ${({ theme }) => theme.colors.ink};
    font-size: 16px; /* prevents iOS zoom on focus */
    font-weight: 500;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.muted};
    }

    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.shadows.pressed};
    }
  }

  button {
    ${buttonBase}
    min-height: 48px;
    padding: 0 18px;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.accent.primary};

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: ${({ theme }) => theme.shadows.pressed};
    }
  }
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 2px 4px 4px 2px;
`

const Row = styled.li<{ $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 4px 6px 4px 12px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $done }) => ($done ? '#e9fbef' : '#fff')};

  label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    cursor: pointer;
  }

  input {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    accent-color: ${({ theme }) => theme.colors.accent.success};
    cursor: pointer;
  }

  span {
    overflow-wrap: anywhere;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    color: ${({ theme, $done }) => ($done ? theme.colors.text.muted : theme.colors.ink)};
    text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
  }
`

const Remove = styled.button`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.text.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.accent.error};
    background: rgba(239, 68, 68, 0.1);
  }
`

const Empty = styled.p`
  padding: 6px 0 2px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.muted};
`

const ClearButton = styled.button`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [text, setText] = useState('')
  const loaded = useRef(false)

  useEffect(() => {
    const saved = readStorage<Task[]>(STORAGE_KEY, [])
    setTasks(Array.isArray(saved) ? saved.map(({ id, text, completed }) => ({ id: String(id), text, completed })) : [])
    loaded.current = true
  }, [])

  useEffect(() => {
    if (loaded.current) writeStorage(STORAGE_KEY, tasks)
  }, [tasks])

  const add = (event: React.FormEvent) => {
    event.preventDefault()
    const value = text.trim()
    if (!value) return
    setTasks((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, text: value, completed: false }])
    setText('')
    trackTaskEvent('add')
  }

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    if (!tasks.find((t) => t.id === id)?.completed) trackTaskEvent('complete')
  }

  const remove = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    trackTaskEvent('delete')
  }

  const done = tasks.filter((t) => t.completed).length
  const subtitle =
    tasks.length === 0 ? 'What are we finishing today?' : `${done} / ${tasks.length} done${done === tasks.length ? ' 🎉' : ''}`

  return (
    <Window icon="✅" iconColor="#58d68d" title="Tasks" subtitle={subtitle} headingId="tasks-heading" tint>
      <Body>
        <Form onSubmit={add}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What are you working on?"
            aria-label="New task"
            maxLength={200}
          />
          <button type="submit" disabled={!text.trim()}>
            Add
          </button>
        </Form>

        {tasks.length === 0 ? (
          <Empty>Add the one thing you want to finish this session.</Empty>
        ) : (
          <List>
            {tasks.map((task) => (
              <Row key={task.id} $done={task.completed}>
                <label>
                  <input type="checkbox" checked={task.completed} onChange={() => toggle(task.id)} />
                  <span>{task.text}</span>
                </label>
                <Remove type="button" onClick={() => remove(task.id)} aria-label={`Delete "${task.text}"`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </Remove>
              </Row>
            ))}
          </List>
        )}

        {done > 0 && (
          <ClearButton type="button" onClick={() => setTasks((prev) => prev.filter((t) => !t.completed))}>
            Clear completed ({done})
          </ClearButton>
        )}
      </Body>
    </Window>
  )
}

export default TaskList
