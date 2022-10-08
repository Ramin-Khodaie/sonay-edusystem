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
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";


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
  