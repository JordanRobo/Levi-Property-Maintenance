#!/bin/bash

# Get current timestamp for versioning
VERSION=$(date +%Y%m%d-%H%M%S)

echo "Building levi-web:$VERSION and levi-web:latest"

# Build for your current platform only
docker build \
  -t jordanrobo22/levi-web:$VERSION \
  -t jordanrobo22/levi-web:latest .

# Push both tags
docker push jordanrobo22/levi-web:$VERSION
docker push jordanrobo22/levi-web:latest

echo "Built and pushed:"
echo "  jordanrobo22/levi-web:$VERSION"
echo "  jordanrobo22/levi-web:latest"
