import "./App.css";
import {
  Container,
  SimpleGrid,
  List,
  ThemeIcon,
  rem,
  Input,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import CardComponent from "./components/Card";
import { useState } from "react";

const storeItems = [
  {
    name: "Oyuncak Araba",
    src: "araba",
    price: 20,
  },
  {
    name: "Ayakkabı",
    src: "ayakkabı",
    price: 10,
  },
  {
    name: "Kamera",
    src: "camera",
    price: 25,
  },
  {
    name: "Klasik Saat",
    src: "saat",
    price: 25,
  },
];

function App() {
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = basketItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  return (
    <Container>
      <SimpleGrid cols={3} className="simple">
        {storeItems.map(({ name, price, src }, index) => {
          return (
            <CardComponent
              name={name}
              src={src}
              price={price}
              key={index}
              onAdd={() => setBasketItems([...basketItems, { name }])}
            />
          );
        })}
      </SimpleGrid>
      <Input.Wrapper label="Arama">
        <Input onChange={(e) => setSearchValue(e.target.value)} />
      </Input.Wrapper>
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
        {filteredItems.map(({ name }, index) => (
          <List.Item key={index}>{name}</List.Item>
        ))}
      </List>
    </Container>
  );
}

export default App;
