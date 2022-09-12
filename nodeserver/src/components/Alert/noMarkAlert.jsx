import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Text,
  } from '@chakra-ui/react'
  function NoMarkAlert(props) {

  
    return (


        <Alert
  status='warning'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='auto'
  borderRadius={'3rem'}
  mt={'100px'}
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>

<Text textAlign={'center'} fontFamily={'Lalezar'} fontSize={'25px'}>برای این دوره هنوز نمره ای دریافت نکرده اید. </Text>

  </AlertTitle>
  <AlertDescription mb={'10px'} mx={'13px'} maxW={'lg'}>
   <Text   textAlign={'justify'}>
   توجه داشته باشید برای فعال شدن پنل ثبت نام برای ترم جدید بایستی نمرات ترم توسط دبیر وارد سامانه گردد. در صورت کسب نمره قبولی قادر به ثبت نام خواهید بود. لازم به ذکر است نمره قبولی برای گذراندن هر ترم حداقل 75 می باشد. در صورت هرگونه ابهام سوالات خود را با مدیریت در میان بگذارید. 
   </Text>
  </AlertDescription>
</Alert>


    );
  }
  
  export default NoMarkAlert;
  