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


export const UserPop1 = () => {
  return (
    <Popover    offset={[-20,20]} arrowSize={'12'} >
      <PopoverTrigger>
       <QuestionIcon mr={"10px"} mt={'5px'} color={'yellow.600'} fontSize={'22px'} />
      </PopoverTrigger>
      <PopoverContent  >
      <PopoverCloseButton />
        <PopoverArrow    />
        
        <PopoverHeader textAlign={'center'}>راهنمای ثبت کاربر</PopoverHeader>
        <PopoverBody >
            <Text textAlign={'justify'}>
                
با استفاده از فرم زیر می توانید کاربر جدید ایجاد کنید. کاربر می تواند با استفاده از نام کاربری و رمز عبوری که شما آن را تعریف نمودید وارد سیستم شود.
هر کاربر نسبت به نقش و دوره ای که برای خود تعریف شده دسترسی های متفاوتی خواهد داشت
هنگام تعریف کاربر به موارد زیر توجه فرمایید:

            </Text>


            <List pt={'10px'} spacing={2}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    نام کاربری منحصر به فرد باشد
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    ایمیل و شماره تماس معتبر وارد شود
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
   تمامی اطلاعات وارد شود 
  </ListItem>

</List>

        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};




export const UserPop2 = () => {
    return (
      <Popover     offset={[-20,20]} arrowSize={'12'} >
        <PopoverTrigger>
         <QuestionIcon mr={"10px"} mt={'15px'} color={'yellow.600'} fontSize={'22px'} />
        </PopoverTrigger>
        <PopoverContent  >
        <PopoverCloseButton />
          <PopoverArrow    />
          
          <PopoverHeader textAlign={'center'}>راهنمای جدول کاربران</PopoverHeader>
          <PopoverBody dir='rtl' >
              <Text textAlign={'justify'}>
 تمامی کاربران تعریف شده در جدول زیر لیست می شود. میتوانید آنها را حذف یا ویرایش کنید.
با فشردن دکمه "نمایش فیلترها" می توانید کاربر مورد نظر خود را بر حسب پارامتر های متفاوت جستجو کنید
  
              </Text>

  
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };
  