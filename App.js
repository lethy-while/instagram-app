import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

function Avatar({ source, size = 64 }) {
  return <Image source={{ uri: source }} style={[baseStyles.avatar, { width: size, height: size, borderRadius: size / 2 }]} />;
}

function Heading({ children }) {
  return <Text style={baseStyles.heading}>{children}</Text>;
}

function Title({ children, style }) {
  return <Text style={[baseStyles.title, style]}>{children}</Text>;
}

function WoofCard({ name, avatar }) {
  return (
    <View style={woofCardStyles.card}>
      <Avatar source={avatar} size={62} />
      <Title style={woofCardStyles.name}>{name}</Title>
    </View>
  );
}

function WoofPost({ image, title, description }) {
  return (
    <View style={woofPostStyles.container}>
      <Image source={{ uri: image }} style={woofPostStyles.image} />

      <View style={woofPostStyles.content}>
        <Title style={woofPostStyles.postTitle}>{title}</Title>
        <Text style={woofPostStyles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <ScrollView contentContainerStyle={screenStyles.container}>
        <Heading>Trending Woofs</Heading>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={screenStyles.woofsRow}
        >
          {data.woofs.map((woof) => (
            <WoofCard key={woof.id} name={woof.name.toUpperCase()} avatar={woof.avatar} />
          ))}
        </ScrollView>

        <Heading>New Woof Posts</Heading>

        <View style={screenStyles.postsList}>
          {data.posts.map((post) => (
            <WoofPost
              key={post.id}
              image={post.image}
              title={post.title.toUpperCase()}
              description={post.description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return <HomeScreen />;
}

const baseStyles = StyleSheet.create({
  avatar: {
    backgroundColor: '#D4D4D8',
  },
  heading: {
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#111827',
    marginBottom: 14,
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#261B5E',
  },
});

const woofCardStyles = StyleSheet.create({
  card: {
    width: 118,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8DF',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    marginTop: 12,
    textAlign: 'center',
  },
});

const woofPostStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
  },
  image: {
    flex: 1,
    height: 108,
    borderRadius: 14,
  },
  content: {
    flex: 2,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  postTitle: {
    marginBottom: 6,
    lineHeight: 18,
  },
  description: {
    color: '#2E2566',
    fontSize: 16,
    lineHeight: 22,
  },
});

const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F4',
  },
  container: {
    paddingTop: 12,
    paddingBottom: 30,
  },
  woofsRow: {
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  postsList: {
    paddingHorizontal: 18,
  },
});

const data = {
  woofs: [
    {
      id: 'woof-1',
      name: 'Rex',
      avatar:
        'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=648&q=80',
    },
    {
      id: 'woof-2',
      name: 'Ball-r',
      avatar:
        'https://images.unsplash.com/photo-1585584114963-503344a119b0?auto=format&fit=crop&h=64&q=80',
    },
    {
      id: 'woof-3',
      name: 'Happy',
      avatar:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&h=64&q=80',
    },
    {
      id: 'woof-4',
      name: 'Fluffy',
      avatar:
        'https://images.unsplash.com/photo-1554956615-1ba6dc39921b?auto=format&fit=crop&h=64&q=80',
    },
    {
      id: 'woof-5',
      name: 'Spirit',
      avatar:
        'https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?auto=format&fit=crop&h=64&q=80',
    },
  ],
  posts: [
    {
      id: 'post-1',
      image:
        'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=967&q=80',
      title: 'Happy Woofs',
      description:
        "How to keep your woof happy and healthy. We've asked some of the best experts out there.",
    },
    {
      id: 'post-2',
      image:
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=850&q=80',
      title: 'Woofs & friends',
      description: 'Best friends are important for humans, but also for dogs.',
    },
    {
      id: 'post-3',
      image:
        'https://images.unsplash.com/photo-1558947530-cbcf6e9aeeae?auto=format&fit=crop&w=634&q=80',
      title: 'Good Woofs',
      description: 'When they behave right, they are not a danger to society.',
    },
    {
      id: 'post-4',
      image:
        'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1100&q=80',
      title: 'Wild Woofs',
      description: 'Wild woofs can be common in some places. Learn safe interactions.',
    },
    {
      id: 'post-5',
      image:
        'https://images.unsplash.com/photo-1567014543648-e4391c989aab?auto=format&fit=crop&w=1050&q=80',
      title: 'Sleepy Woofs',
      description: 'Sleep is just as important for woofs as it is for humans.',
    },
    {
      id: 'post-6',
      image:
        'https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?auto=format&fit=crop&w=967&q=80',
      title: 'Exploring Woofs',
      description: 'How do woofs explore the world around them every day?',
    },
  ],
};
