echo "--- Clean install ---"

echo "Remove old modules"

rimraf ./package-lock.json
rimraf ./node_modules

echo "Install dependencies"

npm i

echo "Build vendor bundle"

npm run build:vendor

echo "Clean install finished"
