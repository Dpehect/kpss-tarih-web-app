import fs from "node:fs";
import path from "node:path";

const duplicateRoute = path.join(process.cwd(), "src", "app", "(main)", "exams", "[examId]");

if (fs.existsSync(duplicateRoute)) {
  fs.rmSync(duplicateRoute, { recursive: true, force: true });
  console.log("Removed duplicate exams route:", path.relative(process.cwd(), duplicateRoute));
} else {
  console.log("Duplicate exams route not found:", path.relative(process.cwd(), duplicateRoute));
}
