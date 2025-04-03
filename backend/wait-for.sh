#!/bin/sh

set -e

host="$1"
port="$2"

until nc -z "$host" "$port"; do
  echo "Waiting for MySQL at $host:$port..."
  sleep 2
done

echo "MySQL is up - executing command"
exec "$@"
