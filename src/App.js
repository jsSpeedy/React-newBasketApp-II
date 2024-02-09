import "./App.css";
import {
  Container,
  SimpleGrid,
  List,
  ThemeIcon,
  rem,
  Input,
  Button,
  Flex,
  Drawer,
  Indicator,
  Badge,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconDatabase,
  IconBasketFilled,
} from "@tabler/icons-react";
import CardComponent from "./components/Card";
import { useState } from "react";

const storeItems = [
  {
    id: 100,
    name: "Oyuncak Araba",
    src: "araba",
    price: 20,
  },
  {
    id: 101,
    name: "Ayakkabı",
    src: "ayakkabı",
    price: 10,
  },
  {
    id: 102,
    name: "Kamera",
    src: "camera",
    price: 25,
  },
  {
    id: 103,
    name: "Klasik Saat",
    src: "saat",
    price: 25,
  },
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  let addToBasket = ({ id, name }) => {
    let basketIndex = basketItems.findIndex((item) => item.id === id);
    if (basketIndex >= 0) {
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count += 1;
      setBasketItems(_basketItems);
    } else {
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    }
  };
  return (
    <Container>
      <Flex align="flex-end" gap="sm" justify="center">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Indicator color="red" label={basketItems.length} size={22}>
          <Button leftIcon={<IconDatabase />} onClick={() => setOpened(true)}>
            <IconBasketFilled size={22} />
          </Button>
        </Indicator>
      </Flex>
      <SimpleGrid cols={3} className="simple">
        {filteredItems.map(({ id, name, price, src }, index) => {
          return (
            <CardComponent
              name={name}
              src={src}
              price={price}
              key={index}
              onAdd={() => addToBasket({ id, name })}
            />
          );
        })}
      </SimpleGrid>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Sepetim">
        <List
          className="list"
          spacing="md"
          size="md"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          {basketItems.map(({ name, count }, index) => (
            <List.Item key={index}>
              <Flex align="center" gap="sm">
                {name}
                <Badge variant="light">{count}</Badge>
              </Flex>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
