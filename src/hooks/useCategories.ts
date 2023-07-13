import { useEffect, useState } from "react";
import HomePageSettings from "../model/settings/HomePageSettings";
import { categoryService, settingService } from "../config/servicesConfig";
import Category from "../model/Category";

const useCategories = (): [boolean, string, Category[]] => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    categoryService
      .getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [isLoading, error, categories];
};

export default useCategories;
