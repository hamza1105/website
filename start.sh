#!/bin/bash

echo "========================================"
echo "   RendezVous Pro - Starting Server"
echo "========================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies!"
        exit 1
    fi
fi

echo "Starting RendezVous Pro server..."
echo
echo "Frontend: http://localhost:3000"
echo "API: http://localhost:3000/api"
echo "Health: http://localhost:3000/api/health"
echo
echo "Press Ctrl+C to stop the server"
echo

npm start 