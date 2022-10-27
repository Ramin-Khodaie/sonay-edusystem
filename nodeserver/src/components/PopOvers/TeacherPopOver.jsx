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

export const TeacherPop1 = () => {
  const iconBlue = useColorModeValue("blue", "white");
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <Button bg={"yellow.500"}>راهنمای ورود نمره</Button>
      </PopoverTrigger>
      <PopoverContent ml={"30px"} w={"500px"}>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>راهنمای ورود نمره </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
            دبیر گرامی! جهت ورود نمره، کلاس مد نظر خود را از سلکتور بالای صفحه
            انتخاب کنید. پس از انتخاب زبان آموز هایی که برای کلاس انتخاب شده
            تعریف شده اند،نمایش داده می شوند. با جابه جایی پنل زبان آموزان به
            سمت راست یا چپ، زبان آموز مد نظر خود را پیدا و روی آن کلیک کنید. پس
            از کلیک روی زبان آموز فرم ورود نمره برایتان باز می شود که با پر کردن
            اطلاعات درخواستی،می توانید نمره زبان آموز را ثبت کنید. پس از ثبت،
            نمره، در جدول "لیست نمرات وارد شده" لیست می شود که می توانید آن را
            مشاهده یا ویرایش کنید
          </Text>

          <Divider my={"10px"} />
          <Text>هنگام ثبت نمره به موارد زیر توجه کنید</Text>

          <List pt={"10px"} spacing={2}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              تمامی فیلد ها تکمیل کنید و در صورت نداشتن نمره عدد صفر وارد کنید{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              پیام شما برای زبان آموز از اهمیت چند برابری برخوردار است. سعی کنید
              نقاط ضعف و قدرت زبان آموز در ترم جاری به طور مفصل شرح دهید{" "}
            </ListItem>
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};




export const TeacherPop2 = () => {
    return (
      <Popover     offset={[-20,20]} arrowSize={'12'} >
        <PopoverTrigger>
         <QuestionIcon mr={"10px"} mt={'15px'} color={'yellow.600'} fontSize={'22px'} />
        </PopoverTrigger>
        <PopoverContent  >
        <PopoverCloseButton />
          <PopoverArrow    />
          
          <PopoverHeader textAlign={'center'}>راهنمای جدول نمرات وارد شده</PopoverHeader>
          <PopoverBody dir='rtl' >
              <Text textAlign={'justify'}>
 تمامی نمرات وارد شده توسط شما در جدول زیر لیست می شود. میتوانید آنها را حذف یا ویرایش کنید.
با فشردن دکمه "نمایش فیلترها" می توانید دوره مورد نظر خود را بر حسب پارامتر های متفاوت جستجو کنید
  
              </Text>

  
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };