import { interpolate, useCurrentFrame } from "remotion";
import { RESULTS } from "../data/searchData";
import { SearchResult } from "./SearchResult";

export const RankingList: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const sort = interpolate(frame, [start + 22, start + 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const initial = [0, 3, 1, 2]; const final = [0, 1, 2, 3];
  return <>{RESULTS.map((item, index) => <SearchResult key={item.name} {...item} start={start + index * 4} y={560 + (initial[index] * (1 - sort) + final[index] * sort) * 122} />)}</>;
};
