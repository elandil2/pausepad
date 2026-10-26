import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { readStorage, writeStorage } from '../../utils/storage'
import { trackTaskEvent } from '../../utils/analytics'

interface Task {
  id: string
  text: string
  completed: boolean
}

const STORAGE_KEY = 'pausepad-tasks'

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface.base};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 600;
  }
`

const Count = styled.span`
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface.raised};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Form = styled.form`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
    min-width: 0;
    height: 44px;
    padding: 0 14px;
    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid ${({ theme }) => theme.colors.surface.borderStrong};
    background: rgba(0, 0, 0, 0.2);
    font-size: 16px; /* prevents iOS zoom on focus */

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.muted};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent.primary};
    }
  }

  button {
    height: 44px;
    padding: 0 16px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: #1b0d0b;
    background: ${({ theme }) => theme.colors.accent.primary};

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  max-height: 320px;
  overflow-y: auto;
  margin: 0 -6px;
`

const Row = styled.li<{ $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 6px;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.base};
  }

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
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.colors.accent.primary};
    cursor: pointer;
  }

  span {
    overflow-wrap: anywhere;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme, $done }) => ($done ? theme.colors.text.muted : theme.colors.text.primary)};
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
    background: rgba(248, 113, 113, 0.1);
  }
`

const Empty = styled.p`
  padding: 12px 0 4px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`

const ClearButton = styled.button`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
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

  return (
    <Panel aria-labelledby="tasks-heading">
      <Head>
        <h2 id="tasks-heading">Tasks</h2>
        <Count aria-label={`${done} of ${tasks.length} done`}>
          {done}/{tasks.length}
        </Count>
      </Head>

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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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
    </Panel>
  )
}

export default TaskList
