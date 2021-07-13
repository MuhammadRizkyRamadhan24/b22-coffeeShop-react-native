import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        {
          id: 1,
          name: 'Cold Brew',
          price: 25000,
          promo_price: 15000,
          image:
            'https://asset.kompas.com/crops/DpSdiMtyqVGS9-PzqxHGhl-HeCA=/32x0:938x604/750x500/data/photo/2020/08/08/5f2e0b7bf0a9d.jpg',
        },
        {
          id: 2,
          name: 'Kombucha Tea',
          price: 35000,
          promo_price: 25000,
          image:
            'https://nusadaily.com/wp-content/uploads/2020/10/1410-Teh-Kombucha-foodbeverageinsider.jpg',
        },
        {
          id: 3,
          name: 'Aglio olio',
          price: 55000,
          promo_price: 25000,
          image:
            'https://awsimages.detik.net.id/community/media/visual/2021/03/19/spaghetti-aglio-olio_43.jpeg?w=700&q=90',
        },
        {
          id: 4,
          name: 'Bolognese spaghetti',
          price: 55000,
          promo_price: 25000,
          image:
            'https://res.cloudinary.com/sisternet-co-id/image/upload/q_auto:best,f_auto/article/igoxewziea9apal2e6sd.jpg',
        },
        {
          id: 5,
          name: 'Kopi Luwak',
          price: 55000,
          promo_price: 15000,
          image:
            'https://fs.genpi.co/uploads/news/2018/11/20/ba790325fe921f74ab01e81ccda84c4c.jpg',
        },
        {
          id: 6,
          name: 'Mac n cheese',
          price: 55000,
          promo_price: 25000,
          image:
            'https://awsimages.detik.net.id/community/media/visual/2020/08/11/macaroni-and-cheese_43.jpeg?w=700&q=90',
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>Promo</Text>
          </View>
        </View>
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={styles.wrapperCard}
          data={this.state.item}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.card}>
                <View style={styles.wrapperTextCard}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <Text style={styles.cardDiscountPriceText}>
                    IDR {item.promo_price}
                  </Text>
                  <Text style={styles.cardItemText}>{item.name}</Text>

                  <Text style={styles.cardPriceText}>IDR {item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  wrapperSpinner: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperNav: {
    alignItems: 'center',
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row',
  },
  buttonBack: {
    marginRight: 13,
  },
  titleScreen: {
    marginTop: 4,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperCard: {
    marginVertical: 50,
    width: 340,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    height: 242,
    width: 156,
    margin: 7,
  },
  wrapperTextCard: {
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
    height: 212,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  cardImage: {
    height: 126,
    width: 126,
    marginTop: -30,
    borderRadius: 999,
  },
  cardItemText: {
    textAlign: 'center',
    width: 120,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    marginTop: 10,
  },
  cardDiscountPriceText: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    marginTop: -30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 1,
  },
  cardPriceText: {
    color: '#9F9F9F',
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
    fontSize: 15,
    marginTop: 5,
  },
});
