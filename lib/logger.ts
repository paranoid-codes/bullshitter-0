type LogLevel = "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  event: string
  data?: Record<string, any>
  timestamp: string
}

function formatTimestamp(date: Date): string {
  return date.toISOString()
}

export function log(level: LogLevel, event: string, data?: Record<string, any>) {
  const timestamp = formatTimestamp(new Date())
  const entry: LogEntry = {
    level,
    event,
    data,
    timestamp,
  }

  // Console output with timestamp and color coding
  const base = `[${timestamp}] [${level.toUpperCase()}] ${event}`
  if (level === "info") {
    console.info(base, data || "")
  } else if (level === "warn") {
    console.warn(base, data || "")
  } else {
    // console.error(base, data || "")
  }

  // Optionally: send to backend
  // fetch("/api/log", { method: "POST", body: JSON.stringify(entry) })

  return entry
}
