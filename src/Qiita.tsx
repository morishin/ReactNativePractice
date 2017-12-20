import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl
} from 'react-native';
import { ListItem } from 'react-native-elements';

interface Props {}

interface State {
  isLoading: boolean;
  posts: Post[];
  nextPage: number;
}

interface Post {
  id: string;
  title: string;
  likes_count: number;
  user: {
    id: string;
    profile_image_url: string;
  };
}

const styles = StyleSheet.create({
  list: {},
  base: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15
  }
});

export default class Qiita extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      posts: [],
      nextPage: 1
    };
  }

  public componentDidMount() {
    this.loadData(true);
  }

  public render() {
    return (
      <View style={[styles.base]}>
        <FlatList
          style={styles.list}
          data={this.state.posts}
          keyExtractor={item => item.id}
          onScroll={event => this.onScroll(this, event)}
          scrollEventThrottle={500}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.title}
              subtitle={`by ${item.user.id} ♥${item.likes_count}`}
              avatar={{ uri: item.user.profile_image_url }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this.onRefresh(this)}
              tintColor="#555"
              titleColor="#555"
            />
          }
          ListFooterComponent={
            this.state.isLoading ? <ActivityIndicator /> : null
          }
        />
      </View>
    );
  }

  private async fetchPosts(
    page: number,
    perPage: number = 20
  ): Promise<[Post]> {
    const posts = await fetch(
      `https://qiita.com/api/v2/items?page=${page}&per_page=${perPage}`
    ).then(response => response.json());
    return posts;
  }

  private onScroll(
    self: Qiita,
    event?: NativeSyntheticEvent<NativeScrollEvent>
  ): void {
    if (event === undefined) {
      return;
    }
    const nativeEvent = event.nativeEvent;
    if (
      nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height
    ) {
      self.loadData(false);
    }
  }

  private onRefresh(self: Qiita): void {
    self.loadData(true);
  }

  private loadData(refresh: boolean): void {
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    this.fetchPosts(this.state.nextPage)
      .then(posts => {
        this.setState(previousState => {
          return {
            isLoading: false,
            posts: refresh ? posts : previousState.posts.concat(posts),
            nextPage: previousState.nextPage + 1
          };
        });
      })
      .catch(error => {
        console.error(error);
        this.setState(previousState => {
          return { isLoading: false };
        });
      });
  }
}
