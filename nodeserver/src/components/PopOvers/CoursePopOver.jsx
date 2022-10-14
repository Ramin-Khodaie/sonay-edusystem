import { QuestionIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Button,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import Buttons from "react-multi-date-picker/components/button";


export const CoursePop1 = () => {
  return (
    <Popover size={'xl'}    offset={[-20,20]} arrowSize={'12'} >
      <PopoverTrigger>
       <QuestionIcon mr={"10px"} mt={'5px'} color={'yellow.600'} fontSize={'22px'} />
      </PopoverTrigger>
      <PopoverContent  >
      <PopoverCloseButton />
        <PopoverArrow    />
        
        <PopoverHeader textAlign={'center'}>راهنمای ثبت دوره</PopoverHeader>
        <PopoverBody >
            <Text textAlign={'justify'}>
       
       جهت افزودن دوره جدید به سیستم تمامی اطلاعات درخواستی در فرم زیر تکمیل کنید 
       .تفکیک جنسیتی و دبیر را نیز در نام دوره به سلیقه خودتان انجام دهید
       هنگاه تکمیل فرم به موارد زیر توجه کنید:


            </Text>


            <List pt={'10px'} spacing={2}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
نام و توضیحات دوره کوتاه و معنادار باشد  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
حتما دوره قبلی مشخص شود. 
  </ListItem>

</List>

        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};




export const CoursePop2 = () => {
    return (
      <Popover     offset={[-20,20]} arrowSize={'12'} >
        <PopoverTrigger>
         <QuestionIcon mr={"10px"} mt={'15px'} color={'yellow.600'} fontSize={'22px'} />
        </PopoverTrigger>
        <PopoverContent  >
        <PopoverCloseButton />
          <PopoverArrow    />
          
          <PopoverHeader textAlign={'center'}>راهنمای جدول دوره ها</PopoverHeader>
          <PopoverBody dir='rtl' >
              <Text textAlign={'justify'}>
لیست تمامی دوره های تعریف شده در جدول زیر لیست می شود. میتوانید آنها را حذف یا ویرایش کنید.
با فشردن دکمه "نمایش فیلترها" می توانید دوره مورد نظر خود را بر حسب پارامتر های متفاوت جستجو کنید
  
              </Text>

  
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };
  


  

export const CoursePop3 = () => {
  const iconBlue = useColorModeValue("blue", "white");
  return (
    <Popover     offset={[-20,20]} arrowSize={'12'} >
      <PopoverTrigger>

        <Button mt={'10px'}
        bg={'yellow.500'}>
          راهنمای ثبت نام
        </Button>
      

      </PopoverTrigger>
      <PopoverContent w={'500px'}  >
      <PopoverCloseButton />
        <PopoverArrow    />
        
        <PopoverHeader textAlign={'center'}>راهنمای ثبت نام برای دوره جدید</PopoverHeader>
        <PopoverBody dir='rtl' >
            <Text textAlign={'justify'}>
              اگر مایل به سفارش کتاب برای دوره جدید نیز می باشید، دکمه سفارش کتاب (که پایین هزینه دوره قرار دارد)،کلیک کنید تا کتاب های لازم برای دوره نمایش داده شود.
              جهت افزودن محصول به سبد خرید خود،روی آیکون آبی رنگ + کلیک کنید تا آیکون قرمز رنگ حذف نمایان شود.
              این بدین معنا هست که محصول با موفقیت به سبد خرید افزوده شده است.
              جهت حذف محصول از سبد خرید نیز میتوانید روی آیکون قرمز رنگ حذف کلیک کنید تا محصول حذف شود.


            </Text>
            <Divider my={'10px'} />
            <Text>
            بعد از نهایی کردن ثبت خرید خود،
              جهت ثبت نام برای دوره جدید کافیست روی دکمه "ثبت نام" کلیک کنید
              
            </Text>
            <Divider my={'10px'} />
            <Text>قبل از ثبت نام به موارد زیر توجه کنید</Text>

            <List pt={'10px'} spacing={2}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
درصورت داشتن فیلترشکن یا هرگونه وی پی ان،آن را قبل از ادامه خاموش کنید
 </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
بعد از فشردن دکه "ثبت نام" نام محصولات و دوره به همراه قیمت و جمع کلی پرداختی نمایش داده می شود. از صحت دوره و محصولات اطمینان حاصل فرمایید
 </ListItem>

 <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
بعد از تایید نهایی به صفحه پرداخت هدایت خواهید شد. کد رهگیری دریافتی از سمت درگاه پرداخت را یادداشت کنید </ListItem>


<ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
سوالات و ابهامات خود را با مدیر آموزشگاه در میان بگذارید</ListItem>

</List>

        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};