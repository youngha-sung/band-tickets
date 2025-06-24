import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { PiCalendarDotsLight, PiMapPinLight } from "react-icons/pi";
import TicketForm from "./TicketForm";

function BandForm({ band }) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const date = new Intl.DateTimeFormat(undefined, options).format(band.date);

  return (
    <>
      <Container maxW='container.lg' py={12}>
        <Box pb={6}>
          <Heading as='h1' size='xl' pb={2}>{band.name}</Heading>
          <Box fontSize='sm' color='gray'>
            <Flex alignItems="center" gap={1}>
              <Icon as={PiCalendarDotsLight} boxSize={4} />
              <Text>{date}</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Icon as={PiMapPinLight} boxSize={4} />
              <Text>{band.location}</Text>
            </Flex>
          </Box>
        </Box>
        <Flex gap={6} direction={['column', 'row']}>
          <Box flex='1'>
            <Image src={band.imgUrl} alt={`Image for ${band.name}`} pb={4}/>
            <Text fontSize='sm' color='gray' dangerouslySetInnerHTML={{ __html: band.description_blurb }} />
          </Box>
          <Box w={[null, '360px']} bg='gray.50' px={6} pt={6} pb={8}>
            {band.ticketTypes
              ? <TicketForm tickets={band.ticketTypes} />
              : <Text>There is no available tickets.</Text>
            }
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default BandForm;
