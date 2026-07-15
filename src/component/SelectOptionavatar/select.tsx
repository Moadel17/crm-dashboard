import CustomAvatar from "../Header/custom-avatar";
import { Text } from "../Header/text";

type Props = {
  name: string;
  avatarUrl?: string;
  shape?: "circle" | "square";
};

export const SelectOptionWithAvatar = ({ name, avatarUrl, shape }: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <CustomAvatar shape={shape} name={name} src={avatarUrl} />
      <Text>{name}</Text>
    </div>
  );
};
