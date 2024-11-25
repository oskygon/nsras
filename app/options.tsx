import { useLocalSearchParams } from 'expo-router';
import OptionsScreen from '../components/OptionsScreen';

export default function Options() {
  const { title, category } = useLocalSearchParams();
  
  return (
    <OptionsScreen 
      title={title as string} 
      category={category as string}
    />
  );
}