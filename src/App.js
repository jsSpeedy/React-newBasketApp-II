import "./App.css";
import { Container, SimpleGrid, List, ThemeIcon, rem } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import CardComponent from "./components/Card";
import { useState } from "react";

const storeItems = [
  {
    name: "ütü",
    price: 20,
  },
  {
    name: "Basket Topu",
    price: 10,
  },
  {
    name: "Çikolota",
    price: 25,
  },
];

function App() {
  let [basketItems, setBasketItems] = useState([]);
  return (
    <Container>
      <SimpleGrid cols={3} className="simple">
        {storeItems.map(({ name, price }, index) => {
          return (
            <CardComponent
              name={name}
              price={price}
              key={index}
              onAdd={() => setBasketItems([...basketItems, { name }])}
            />
          );
        })}
      </SimpleGrid>
      <List
        className="list"
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
      >
        {basketItems.map(({ name }, index) => (
          <List.Item key={index}>{name}</List.Item>
        ))}
      </List>
    </Container>
  );
}

export default App;
