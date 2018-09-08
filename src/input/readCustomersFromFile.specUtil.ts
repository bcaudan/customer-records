import { file } from "tmp";
import { promisify } from "util";
import { writeFile } from "fs";

const writeFileAsync = promisify(writeFile);

export function createTempFile(content: string): Promise<string> {
  return new Promise((resolve: Function, reject: Function) => {
    file((error, path) => {
      if (error) reject(error);

      writeFileAsync(path, content.trim())
        .then(() => resolve(path))
        .catch((error: any) => reject(error));
    });
  });
}
