import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  iconName: string;
  color?: string;
};

export default function IconButton({ onPress, iconName, color = 'black' }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={iconName} size={24} color={color} />
    </TouchableOpacity>
  );
}
