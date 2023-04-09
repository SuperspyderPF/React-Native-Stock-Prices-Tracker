import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const API_KEY = 'R5KKVRR5DILPCT0W';

const StockApp = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSymbolChange = (text) => {
    setSymbol(text.toUpperCase());
  };

  const handleRefreshPress = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data['Global Quote']) {
        const newPrice = parseFloat(data['Global Quote']['05. price']).toFixed(2);
        setPrice(newPrice);
      } else {
        setPrice(null);
      }
    } catch (error) {
      console.error(error);
      setPrice(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefreshPress();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Stock Price Tracker</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Symbol:</Text>
        <TextInput style={{ marginLeft: 10, marginRight: 10, fontSize: 18, borderWidth: 1, padding: 5, flex: 1 }} value={symbol} onChangeText={handleSymbolChange} />
        <Button title="Refresh" onPress={handleRefreshPress} disabled={loading} />
      </View>
      {loading && <Text style={{ fontSize: 18, marginTop: 20 }}>Loading...</Text>}
      {price && (
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          {symbol}: ${price}
        </Text>
      )}
      {!price && !loading && <Text style={{ fontSize: 18, marginTop: 20 }}>No data available for {symbol}</Text>}
    </View>
  );
};

export default StockApp;
