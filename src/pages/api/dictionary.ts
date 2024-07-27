import { ITranslations } from "@/interfaces/interface";
import Translation from "@/models/translate";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  console.log(req.body);
  if (req.method === "GET") {
    const { word } = req.body;
    if (word) {
      try {
        const rawTranslationData = await Translation.findOne({
          word: word,
        });
        res.status(200).json({ message: rawTranslationData._id });
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "error" });
      }
    } else {
      try {
        const rawTranslationData: ITranslations[] = (await Translation.find()).reverse();
        res.status(200).json(rawTranslationData);
      } catch (err) {
        console.error(err);
        res.status(200).json([]);
      }
    }
  } else if (req.method === "PATCH") {
    try {
      const { _id, word, translations } = req.body;
      await Translation.updateOne(
        { _id: _id },
        {
          word: word,
          translations: translations,
        },
      );
      res.status(200).json({ message: "Ok" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { _id } = req.body;
      await Translation.findByIdAndDelete(_id);
      res.status(200).json({ message: "Ok" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "error" });
    }
  } else if (req.method === "POST") {
    const { word, translations } = req.body;
    if (!translations) {
      try {
        const rawTranslationData = await Translation.findOne({
          word: word,
        });
        if (!rawTranslationData) {
          res.status(200).json({ message: "no" });
        } else {
          res.status(200).json({ message: "Ok" });
        }
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "error" });
      }
    } else {
      try {
        await Translation.create({ word, translations });
        res.status(200).json({ message: "Ok" });
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "error" });
      }
    }
  }
}
