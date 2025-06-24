import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { PiCreditCardLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";

function TicketForm({ tickets }) {
  const [total, setTotal] = useState(0)
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const checkTotalError = (total) => {
    if (total === 0) {
      setError('tickets', { type: "manual", message: "Select ticket(s) to purchase."})
    } else {
      clearErrors('tickets')
    }
  }

  const onSubmit = (data) => {
    checkTotalError(total)

    if (total > 0) {
      console.log('Hang on, making a API request with:', data)
    }
  };

  const formatCentsToDollar = (value) => {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value/100)
  }

  const handleQuantityChange = (value, ticket) => {
    setValue(`tickets.${ticket.type}`, { "quantity": value, "subtotal": value * ticket.cost})
    const tickets = getValues('tickets')
    let newTotal = 0
    Object.entries(tickets).forEach(([key, value]) => {
      newTotal = value?.subtotal ? newTotal + value.subtotal : newTotal
    });
    setTotal(newTotal)
    setValue(`charge`, newTotal)
    checkTotalError(newTotal)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as='h2' size='lg' pb={6}>Select Tickets</Heading>

      <FormControl isInvalid={errors["tickets"]}>
        {tickets.map((ticket) => {
          return (
            <Box key={ticket.type}>
              <Flex gap={6}>
                <Box flex='1'>
                  <Text textTransform="uppercase">{ticket.name}</Text>
                  {ticket.description &&
                    <Text fontSize={'xs'} color={'gray'}>{ticket.description}</Text>
                  }
                  <Text fontSize={'sm'} pt={2}>{formatCentsToDollar(ticket.cost)}</Text>
                </Box>
                <Box w='70px'>
                  <Controller
                    name={`tickets.${ticket.type}.quantity`}
                    control={control}
                    render={({ field: { ref, ...restField } }) => {
                      return (
                        <NumberInput defaultValue={0} min={0} max={999} {...restField} onChange={(value) => handleQuantityChange(value, ticket)}>
                          <NumberInputField bg='white' px={2} ref={ref} name={restField.name} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    }
                  />
                </Box>
              </Flex>
              <Divider my={6} />
            </Box>
          )
        })}
        <FormErrorMessage>
          {errors["tickets"] && errors["tickets"].message}
        </FormErrorMessage>
      </FormControl>

      <Box pb={8}>
        <Flex gap={6}>
          <Text size='md' flex='1'>Total</Text>
          <Text size='md'>{formatCentsToDollar(total)}</Text>
        </Flex>
      </Box>

      <Box pb={4}>
        <Flex gap={2} pb={2}>

          <FormControl isInvalid={errors["first-name"]}>
            <Input
              bg='white'
              placeholder='First Name'
              {...register("first-name", {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors["first-name"] && errors["first-name"].message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors["last-name"]}>
            <Input
              bg='white'
              placeholder='Last Name'
              {...register("last-name", {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors["last-name"] && errors["last-name"].message}
            </FormErrorMessage>
          </FormControl>

        </Flex>

        <FormControl isInvalid={errors["address"]}>
          <Input
            bg='white'
            placeholder='Address'
            {...register("address", {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors["address"] && errors["address"].message}
          </FormErrorMessage>
        </FormControl>

      </Box>

      <Box pb={6}>
        <Text fontSize='sm' fontWeight='bold' pb={2}>Payment Details</Text>

        <FormControl isInvalid={errors["cc-no"]} pb={2} >
          <InputGroup>
            <InputRightElement pointerEvents='none'>
              <Icon as={PiCreditCardLight} boxSize={5} color='gray.400' />
            </InputRightElement>
            <Input
              type='number'
              bg='white'
              placeholder='0000 0000 0000 0000'
              {...register("cc-no", {
                 required: 'This is required',
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors["cc-no"] && errors["cc-no"].message}
          </FormErrorMessage>
        </FormControl>

        <Flex gap={2}>

          <FormControl isInvalid={errors["cc-exp"]}>
            <Input
              bg='white'
              placeholder='MM/YY'
              {...register("cc-exp", {
                 required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors["cc-exp"] && errors["cc-exp"].message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors["cc-cvv"]}>
            <Input
              bg='white'
              placeholder='CVV'
              {...register("cc-cvv", {
                 required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors["cc-cvv"] && errors["cc-cvv"].message}
            </FormErrorMessage>
          </FormControl>

        </Flex>
      </Box>

      <Button type='submit' w='100%' colorScheme='teal'>Get Tickets</Button>
    </form>
  );
}

export default TicketForm;
