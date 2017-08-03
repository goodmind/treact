echo "--- Clean install ---"

echo "Remove old modules"

rimraf ./package-lock.json
rimraf ./node_modules

echo "Install dependencies"

npm i

echo "Clean install finished"
