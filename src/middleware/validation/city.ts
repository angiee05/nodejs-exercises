import { Static, Type } from "@sinclair/typebox";
import { type } from "os";

export const citySchema = Type.Object(
  {
    name: Type.String(),
    population: Type.Optional(Type.Integer()),
  },
  { additionalProperties: false }
);

export type CityData = Static<typeof citySchema>;
