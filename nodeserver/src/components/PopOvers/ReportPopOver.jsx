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

export const ReportPop1 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول سفارشات{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
            پرداخت هایی که به همراه سفارش کتاب هستند،در جدول زیر لیست می شود. به
            صورت پیش فرض سفارشات تا 3ماه گذشته نمایش داده می شود که قابل تغییر
            می باشد. جهت مشاهده تاریخ های پیشین میتوانید از قسمت جستجو بازه
            زمانی مد نظر خود را جستجو کنید. همچنین امکان جستجو بر حسب پارامتر
            های دیگر نیز امکان پذیر هست
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const ReportPop2 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول ثبت نام ها{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
            پرداخت هایی که برای ثبت نام کاربران می باشد در جدول زیر لیست می شود.
            به صورت پیش فرض ثبت نام ها تا 3ماه گذشته لیست می شود که قابل تغییر
            می باشد. جهت مشاهده تاریخ های پیشین می توانید از قسمت جستجو بازه
            زمانی مد نظر خود را جستجو کنید. همچنین امکان جستجو بر حسب پارامتر
            های دیگر نیز امکان پذیر هست
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const ReportPop3 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent
        ml={"10px"}
        width={{ sm: "300px", md: "500px", lg: "500px" }}
      >
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول کارنامه{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text
            fontSize={"15px"}
            fontFamily={"Vazirmatn"}
            textAlign={"justify"}
          >
            در این جدول نمرات شما که در طول ترم کسب کرده اید نمایش داده می شود.
            مقیاس نمرات نسبت به هر دوره میتواند متفاوت باشد. شرح هر یک از نمرات
            به ترتیب ذیل می باشد:
          </Text>

          <List textAlign={'right'} pt={"10px"} spacing={2}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              وضعیت کلی بیانگر این است که آیا زبان آموز توانسته نمره قبولی را
              کسب کند یا نه. passed به معنای قبولی می باشد و failed به معنای
              مردود
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
نمره فعالیت کلاسی هر زبان آموز نسبت به فعالیتی که در طول ترم انجام گرفته کسب می شود
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
نمره کوییز، میانگین نمرات کسب شده هر دانش آموز در کوییز های ترم جاری می باشد
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
نمره اضافی شامل نمراتی هست که دبیر برای برخی فعالیت های خاص شما در نظر گرفته است
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
نمره میانترم،نمره کسب شده در امتحان جامع میانترم می باشد   
         </ListItem>
         <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
نمره پایانترم،نمره کسب شده در امتحان جامع پایانترم می باشد   
         </ListItem>
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};





export const ReportPop4 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent
        ml={"10px"}
        width={{ sm: "300px", md: "500px", lg: "500px" }}
      >
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای نمودار مهارت{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text
            fontSize={"15px"}
            fontFamily={"Vazirmatn"}
            textAlign={"justify"}
          >
            
            در این نمودار مهارت های زبان آموز به صورت کیفی نمایش داده می شود. این مهارت ها توسط دبیر مربوطه برای هر زبان آموز تعریف شده است
            هر چه نمودار به شکل دایره نزدیک تر باشد، بیانگر عملکرد عالی زبان آموز می باشد
            
          </Text>

     
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};



export const ReportPop5 = () => {
  return (
    <Popover offset={[-70, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent
        ml={"10px"}
        width={{ sm: "300px", md: "500px", lg: "500px" }}
      >
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای نمودار عملکرد{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text
            fontSize={"15px"}
            fontFamily={"Vazirmatn"}
            textAlign={"justify"}
          >
        
            در این نمودار عملکرد ترم جاری زبان آموز با میانگین ترم های پیشین مقایسه میگردد.
            انتظار می رود ستون مربوط به "نمرات این ترم" بیشتر از ستون میانگین ترم های قبل باشد.
          </Text>

     
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};





export const ReportPop6 = () => {
  return (
    <Popover offset={[-70, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent
        ml={"10px"}
        width={{ sm: "300px", md: "500px", lg: "500px" }}
      >
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول سوابق تحصیلی{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text
            fontSize={"15px"}
            fontFamily={"Vazirmatn"}
            textAlign={"justify"}
          >
        
تمامی نمرات ترم های قبل شما در جدول زیر لیست شده است که با کلیک روی دکمه "مشاهده" میتوانید جزعیات هر یک را مشاهده نمایید. همچنین با فشردن دکمه نمایش فیلتر ها، می توانید نمره خود را با استفاده از پارامتر های مختلف فیلتر و جستجو کنید
          </Text>

     
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};



export const ReportPop7 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول ثبت نام های من{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
            پرداخت هایی که برای ثبت نام شما می باشد در جدول زیر لیست می شود.
            به صورت پیش فرض ثبت نام ها تا 3ماه گذشته لیست می شود ،جهت مشاهده تاریخ های پیشین می توانید از قسمت جستجو بازه
            زمانی مد نظر خود را جستجو کنید. همچنین امکان جستجو بر حسب پارامتر
            های دیگر نیز امکان پذیر هست
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};



export const ReportPop8 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>
           راهنمای جدول سفارشات من
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
            پرداخت هایی که به همراه سفارش کتاب هستند،در جدول زیر لیست می شود. به
            صورت پیش فرض سفارشات تا 3ماه گذشته نمایش داده می شود که قابل تغییر
            می باشد. جهت مشاهده تاریخ های پیشین می توانید از قسمت جستجو بازه
            زمانی مد نظر خود را جستجو کنید. همچنین امکان جستجو بر حسب پارامتر
            های دیگر نیز امکان پذیر هست
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
