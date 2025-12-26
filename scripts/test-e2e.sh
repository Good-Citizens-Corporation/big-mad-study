#!/usr/bin/env bash
set -euo pipefail

HOST=127.0.0.1
PORT=3000
LOG_FILE="/tmp/test-e2e-server.${HOST}-${PORT}.$$"

stop_existing_server() {
  local pids
  pids=$(lsof -tiTCP:"$PORT" 2>/dev/null || true)
  if [[ -n "$pids" ]]; then
    echo "Stopping existing server on port $PORT ($pids)" >&2
    for pid in $pids; do
      if kill "$pid" 2>/dev/null; then
        wait "$pid" 2>/dev/null || true
      fi
    done
  fi
}

stop_existing_server

yarn dev --hostname "$HOST" --port "$PORT" >"$LOG_FILE" 2>&1 &
DEV_PID=$!

cleanup() {
  if kill -0 "$DEV_PID" 2>/dev/null; then
    kill "$DEV_PID"
    wait "$DEV_PID" || true
  fi
  rm -f "$LOG_FILE"
}
trap cleanup EXIT

for _ in {1..30}; do
  if curl -sSf "http://$HOST:$PORT" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

verbose=false
playwright_args=()
while (( $# )); do
  case "$1" in
    --verbose)
      verbose=true
      shift
      ;;
    *)
      playwright_args+=("$1")
      shift
      ;;
  esac
done

if $verbose; then
  export AC_VERBOSE=1
fi

if (( ${#playwright_args[@]} )); then
  yarn playwright test "${playwright_args[@]}"
else
  yarn playwright test
fi
