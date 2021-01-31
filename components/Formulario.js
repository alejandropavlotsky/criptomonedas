import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = () => {
  const [moneda, setMoneda] = useState('');
  const [criptoMoneda, setCriptoMoneda] = useState('');
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };
  const obtenerCriptoMoneda = (cripto) => {
    setCriptoMoneda(cripto);
  };
  const cotizarPrecio = () => {
    console.log('cotizando');
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        selectedValue={moneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={(cripto) => obtenerCriptoMoneda(cripto)}
        selectedValue={criptoMoneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnCotizar} onPress={cotizarPrecio}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {backgroundColor: '#5e49e2', padding: 10, marginTop: 20},
  textoCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
