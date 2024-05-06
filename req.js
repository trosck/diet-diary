import { XMLParser } from "fast-xml-parser";
import { writeFile } from "fs/promises";

const parser = new XMLParser();
const info = [];

let page = 1;
while (true) {
  console.log("page", page);

  const response = await fetch(
    `https://www.sochetaizer.ru/goods/caloricity?page=${page}&pagination=true&respond_with=body`
  ).then((r) => r.text());

  const isAllOver = response.includes("Продукты не найдены");
  if (isAllOver) {
    break;
  }

  const data = parser.parse(response);

  console.log(data);

  for (const { div: item } of data.div) {
    if (typeof item === "string") {
      break;
    }

    const [
      {
        a: {
          div: [, name],
        },
      },
      { "#text": calories },
      { "#text": proteins },
      { "#text": fats },
      { "#text": carbs },
    ] = item;

    info.push({
      name,
      calories,
      proteins,
      fats,
      carbs,
    });
  }

  page++;
}

await writeFile("data.json", JSON.stringify(info));
