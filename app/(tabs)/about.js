import { ScrollView, View, Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function About() {
  const className = "text-white";

  return (
    <Screen>
      <ScrollView>
        <View>
          <Text className={`${className}`}>Sobre el Autor</Text>
          <Text className={`${className}`}>Nombre: Yousuf Boutahar</Text>
          <Text className={`${className}`}>
            Biografía: Yousuf Boutahar es un desarrollador de software con
            experiencia en una variedad de tecnologías y plataformas. Ha
            trabajado en proyectos que van desde aplicaciones móviles hasta
            sistemas backend complejos. Es apasionado por la tecnología y
            siempre está buscando aprender nuevas cosas.
          </Text>
          <Text className={`${className}`}>
            Contacto: yusef_boutahar@hotmail.com
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
