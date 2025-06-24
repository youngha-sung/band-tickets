import { Box, Container, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react'
import { PiCalendarDotsFill, PiMapPinFill } from "react-icons/pi";

function BandForm({ band }) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const date = new Intl.DateTimeFormat(undefined, options).format(band.date);

  return (
    <>
      <Container maxW='container.lg'>
        <Box pb={6}>
          <Heading as='h1' size='xl' pb={2}>{band.name}</Heading>
          <Box fontSize='sm' color='gray'>
            <Flex alignItems="center" gap={1}>
              <Icon as={PiCalendarDotsFill} boxSize={4} />
              <Text>{date}</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Icon as={PiMapPinFill}  boxSize={4} />
              <Text>{band.location}</Text>
            </Flex>
          </Box>
        </Box>
        <Flex gap={6} direction={['column', 'row']}>
          <Box flex='1'>
            <Image src={band.imgUrl} alt={`Image for ${band.name}`} pb={4}/>
            <Text fontSize='sm' color='gray' dangerouslySetInnerHTML={{ __html: band.description_blurb }} />
          </Box>
          <Box w={[null, '360px']} bg='gray.100' px={6} py={4}>
            <Heading as='h2' size='lg'>Select Tickets</Heading>
            {band.ticketTypes ?
              band.ticketTypes.map((ticket) => (
                <p>
                  {ticket.name} - {ticket.description}
                </p>
              ))
              :
              <Text>There's no ticket available</Text>
            }
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default BandForm;
