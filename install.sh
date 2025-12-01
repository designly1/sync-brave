#!/usr/bin/env bash
set -e

NODE_VERSION="20"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() {
	echo -e "${RED}[ERROR]${NC} $1"
	exit 1
}

# Check for Node.js
if command -v node &>/dev/null; then
	CURRENT_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
	if [ "$CURRENT_VERSION" -ge "$NODE_VERSION" ]; then
		info "Node.js v$(node -v | cut -d'v' -f2) found"
	else
		warn "Node.js v$CURRENT_VERSION found, but v$NODE_VERSION+ recommended"
	fi
else
	warn "Node.js not found. Installing via nvm..."

	# Install nvm if not present
	if ! command -v nvm &>/dev/null; then
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
		export NVM_DIR="$HOME/.nvm"
		[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
	fi

	nvm install "$NODE_VERSION"
	nvm use "$NODE_VERSION"
	info "Node.js v$NODE_VERSION installed"
fi

# Check for pnpm
if command -v pnpm &>/dev/null; then
	info "pnpm $(pnpm -v) found"
else
	info "Installing pnpm..."
	corepack enable
	corepack prepare pnpm@latest --activate
	info "pnpm installed"
fi

# Install dependencies
info "Installing dependencies..."
pnpm install

info "Done! Run 'pnpm start' to trigger Brave sync."
