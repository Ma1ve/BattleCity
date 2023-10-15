import { Request, Response } from "express";

import Themes from "../models/Themes";

export const setTheme = async (
    request: Request, 
    response: Response
  ) => {
    const { theme, id } = request.body;
    
    try {
        await (Themes as any).upsert({
          theme,
          userId: id
        });

        response.status(201).json({ theme });
    } catch (error) {
        response.status(500).json(
          { error: "Не удалось сменить тему" }
        );
    }
};

export const getTheme = async (
    request: Request, 
    response: Response
  ) => {
    const userId = request.query["id"];

    try {
        const theme = await (Themes as any).findOne({
            where: { userId }
        });

        response.status(201).json(
          { theme }
        );
    } catch (error) {
        response.status(500).json(
          { error: "Не удалось получить тему" }
        );
    }
};
