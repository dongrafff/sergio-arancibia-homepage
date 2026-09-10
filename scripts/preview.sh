#!/bin/bash
# Levanta vite preview (producción) en 127.0.0.1:4173 y guarda el PID.
cd "/d/Huaso_lalo/13 Homepage" || exit 1
nohup npx vite preview --port 4173 --strictPort --host 127.0.0.1 > /tmp/vite-preview.log 2>&1 &
echo $! > /tmp/vite-preview.pid
sleep 3
if curl -sf -o /dev/null http://127.0.0.1:4173; then
  echo "SERVIDOR OK (pid $(cat /tmp/vite-preview.pid))"
else
  echo "FALLO — log:"
  cat /tmp/vite-preview.log
fi
