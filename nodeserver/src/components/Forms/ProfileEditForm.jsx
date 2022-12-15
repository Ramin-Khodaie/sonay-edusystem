import {
  Flex,
  Input,
  Text,
  Textarea,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import useNotify from "helpers/notify/useNotify";
import { useEffect, useState } from "react";
import { updateProfileInfo } from "services/user";
import { getProfileInfo } from "services/user";

const ProfileEditForm = ({formData , onChange}) => {
  const [isLoading, setIsLoading] = useState(false);

  
  const textColor = useColorModeValue("gray.700", "white");

 
  const notify = useNotify()
  const doSubmit = async () => {
    setIsLoading(true);
    

    await updateProfileInfo(formData).then((res) => {
      if(res.status === 200){
        notify("اطلاعات کاربری با موفقیت به روز رسانی شد", true, "solid", "success");
        setIsLoading(false);

      }else{
        notify("خطایی رخ داد", true, "solid", "error");
        setIsLoading(false);

      }
    });
  };


  return (
    <Card dir={"rtl"} p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          اطلاعات کاربری
        </Text>
      </CardHeader>
      <CardBody px="5px">
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="400" mb={"10px"}>
            درباره من
          </Text>

          <Textarea id="bio" onChange={onChange}
          value={formData.bio}
          mb={"10px"} placeholder="درباره خودتان بنویسید!" />
          <Text fontSize="md" color={textColor} fontWeight="400" mb={"10px"}>
            نام و نام خانوادگی
          </Text>
          <Input id="full_name" onChange={onChange}
          value={formData.full_name}
          placeholder="Basic usage" />
          <Text fontSize="md" color={textColor} fontWeight="400" mb={"10px"}>
            ایمیل
          </Text>

          <Input id="email" onChange={onChange}
          value={formData.email}
          placeholder="ایمیل" />
          <Text  fontSize="md" color={textColor} fontWeight="400" mb={"10px"}>
            آدرس
          </Text>
          <Textarea onChange={onChange}
          value={formData.address}
          id="address"
          mb={"10px"} placeholder="آدرس خودتان را وارد کنید" />

          <Button disabled={isLoading} onClick={doSubmit} colorScheme={'green'} mt={'10px'}>
            
            {isLoading ? "در حال ثبت" : "ثبت اطلاعات"}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default ProfileEditForm;
