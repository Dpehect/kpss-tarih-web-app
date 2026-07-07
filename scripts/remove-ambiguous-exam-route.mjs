import fs from "node:fs";
import path from "node:path";

const target = path.join(process.cwd(), "src", "app", "(main)", "exams", "[examId]");

if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log("Silindi:", path.relative(process.cwd(), target));
} else {
  console.log("Zaten yok:", path.relative(process.cwd(), target));
}
