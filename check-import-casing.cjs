const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "src");
const FILE_REGEX = /\.(js|jsx)$/;

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (FILE_REGEX.test(f)) {
      callback(fullPath);
    }
  });
}

function getAllFiles() {
  const files = [];
  walk(SRC_DIR, (file) => files.push(file));
  return files;
}

function extractImports(code) {
  const importRegex =
    /import\s+(?:[^'"]+\s+from\s+)?["']([^"']+)["']/g;
  const imports = [];
  let match;
  while ((match = importRegex.exec(code))) {
    imports.push(match[1]);
  }
  return imports;
}

function getActualPathSegments(fullPath) {
  const segments = fullPath.split(path.sep);
  const correctedSegments = [];
  let currentPath = path.parse(fullPath).root;

  for (const segment of segments) {
    const dirContents = fs.readdirSync(currentPath);
    const match = dirContents.find(
      (item) => item.toLowerCase() === segment.toLowerCase()
    );
    if (!match) return null;
    correctedSegments.push(match);
    currentPath = path.join(currentPath, match);
  }

  return correctedSegments.join(path.sep);
}

function checkImports() {
  const files = getAllFiles();
  const errors = [];

  files.forEach((filePath) => {
    const code = fs.readFileSync(filePath, "utf8");
    const imports = extractImports(code);

    imports.forEach((imp) => {
      if (
        imp.startsWith(".") &&
        !imp.startsWith("..") &&
        !imp.endsWith(".css")
      ) {
        const absImportPath = path.resolve(path.dirname(filePath), imp);
        let resolvedPath = absImportPath;

        // Handle file extension resolution
        if (!fs.existsSync(resolvedPath)) {
          if (fs.existsSync(resolvedPath + ".js")) {
            resolvedPath += ".js";
          } else if (fs.existsSync(resolvedPath + ".jsx")) {
            resolvedPath += ".jsx";
          } else if (fs.existsSync(path.join(resolvedPath, "index.js"))) {
            resolvedPath = path.join(resolvedPath, "index.js");
          } else if (fs.existsSync(path.join(resolvedPath, "index.jsx"))) {
            resolvedPath = path.join(resolvedPath, "index.jsx");
          } else {
            return; // skip, file doesn't exist
          }
        }

        const actual = getActualPathSegments(resolvedPath);
        if (actual && actual !== resolvedPath) {
          errors.push({
            file: filePath,
            import: imp,
            expected: actual,
          });
        }
      }
    });
  });

  if (errors.length > 0) {
    console.log("⚠️  Case mismatch detected in imports:\n");
    errors.forEach((err) => {
      console.log(
        `In file: ${err.file}\n  → Import: "${err.import}" should be "${path.relative(
          path.dirname(err.file),
          err.expected
        )}"\n`
      );
    });
    process.exit(1);
  } else {
    console.log("✅ All import paths match the filesystem case exactly!");
  }
}

checkImports();