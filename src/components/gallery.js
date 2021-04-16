import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView, Image } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

export default class GalleryPhotoMission extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
              source: "../img/test.jpg",

          },
          {
              title:"Item 2",
              text: "Text 2",
              source: "../img/test.jpg",
          },
          {
              title:"Item 3",
              text: "Text 3",
              source: "../img/test.jpg",
          },
          {
              title:"Item 4",
              text: "Text 4",
              source: "../img/test.jpg",
          },
          {
              title:"Item 5",
              text: "Text 5",
              source: "../img/test.jpg",
          },
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'#333333',
              borderRadius: 5,
              height: 250,
              marginLeft: 25,
              marginRight: 25, }}>
              <Image
                    style={{resizeMode:'cover', width: '100%', height: 200}}
                    source={require('../img/test.jpg')}
              />
            <Text style={{padding:5, fontSize: 30, color:'white',}}>{item.title}</Text>

          </View>

        )
    }

    get pagination () {
        const { carouselItems, activeIndex } = this.state;
        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'floralwhite', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) }/>
            </View>
            { this.pagination }
          </SafeAreaView>
        );
    }
}
