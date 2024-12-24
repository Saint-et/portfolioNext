"use client";

import {
  bannerBg,
  bannerBgAdd,
  Data_Realisation,
  Data_Realisation_Personnel,
  DataDemoVideoComposents,
  Experience,
  FormationData,
  imgDefaultUser,
  User,
} from "@/public/assets/data/Data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LuArrowDownUp,
  LuArrowUpFromDot,
  LuBadge,
  LuBookOpen,
  LuClock,
  LuGithub,
  LuImagePlus,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPen,
  LuPhone,
  LuRefreshCcw,
  LuSunMoon,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SubMenuCards from "./(components)/sub-menu-cards";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CarouselVideo from "./(components)/carousel-video";
import { Input } from "@/components/ui/input";
import ViewerImage from "./(components)/viewer-image";
import { Slider } from "@/components/ui/slider";
import { RemoveScroll } from "react-remove-scroll";
import dynamic from "next/dynamic";
import * as faceapi from "face-api.js";
import toast from "react-hot-toast";
import LoaderApp from "./(components)/loader";
import { ArrowRight } from "lucide-react";
import DialogInfoRealisations from "./(components)/dialog-info-realisation";
import ReactPlayer from "react-player";

type SystemDialogType = "cv" | "formation" | null;
interface SystemSettingInterface {
  theme: string;
  pseudo: string;
  userPicture: string;
  pictureCover: string;
  levelUser: number;
  scroll: boolean;
  cropY: number;
  loader: boolean;
  open: SystemDialogType;
}

export default function Home() {
  const [systemDetectMobile, setSystemDetectMobile] = useState<boolean>(false);
  const [isSystemSetting, setSystemSetting] = useState<SystemSettingInterface>({
    theme: "",
    pseudo: "defaultUser",
    userPicture: imgDefaultUser.src,
    pictureCover: bannerBg.src,
    levelUser: 0,
    scroll: false,
    cropY: 50,
    loader: false,
    open: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);

  const AProposDeMoiRef = useRef<HTMLDivElement | null>(null);
  const MesCompetencesRef = useRef<HTMLDivElement | null>(null);
  const TopProjetRef = useRef<HTMLDivElement | null>(null);
  const MesRealisationsRef = useRef<HTMLDivElement | null>(null);
  const SandBoxRef = useRef<HTMLDivElement | null>(null);
  const Menu = [
    {
      title: "À propos de moi",
      click: () =>
        AProposDeMoiRef.current?.scrollIntoView({
          behavior: "smooth",
        }),
    },
    {
      title: "Mes competences",
      click: () =>
        MesCompetencesRef.current?.scrollIntoView({
          behavior: "smooth",
        }),
    },
    {
      title: "Top projet",
      click: () =>
        TopProjetRef.current?.scrollIntoView({
          behavior: "smooth",
        }),
    },
    {
      title: "Mes réalisations",
      click: () =>
        MesRealisationsRef.current?.scrollIntoView({
          behavior: "smooth",
        }),
    },
    {
      title: "SandBox",
      click: () =>
        SandBoxRef.current?.scrollIntoView({
          behavior: "smooth",
        }),
    },
  ];
  const MenuReseaux = [
    {
      title: "Voir cv",
      icon: LuBookOpen,
      click: () => {
        setSystemSetting((prev: SystemSettingInterface) => ({
          ...prev,
          open: "cv",
        }));
      },
    },
    {
      title: "Formation",
      icon: LuBadge,
      click: () => {
        setSystemSetting((prev: SystemSettingInterface) => ({
          ...prev,
          open: "formation",
        }));
      },
    },
    { title: "Github", icon: LuGithub, click: () => {} },
  ];

  const handleResetSystem = () => {
    setSystemSetting((prev: SystemSettingInterface) => ({
      ...prev,
      pseudo: "defaultUser",
      userPicture: imgDefaultUser.src,
      pictureCover: bannerBg.src,
      cropY: 50,
    }));
  };

  const [srcImg, setSrcImg] = useState<string>("");

  useEffect(() => {
    const theme = sessionStorage.getItem("theme");
    if (!theme)
      return setSystemSetting((prev: SystemSettingInterface) => ({
        ...prev,
        theme: "light",
      }));
    setSystemSetting((prev: SystemSettingInterface) => ({
      ...prev,
      theme: theme,
    }));
    const root = document.documentElement;
    root.style.colorScheme = theme;
    root.className = theme;
  }, []);

  const handleButtonClickImport = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.click();
    }
  };

  const handleFileChangeImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      console.error("Le fichier sélectionné n'est pas une image.");
      return;
    }

    const url = URL.createObjectURL(file);
    return url;
  };

  const handleChangeCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = await handleFileChangeImport(e);

    if (img) {
      setSystemSetting((prev: SystemSettingInterface) => ({
        ...prev,
        pictureCover: img,
      }));
    }
  };
  const handleChangeUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = await handleFileChangeImport(e);

    if (img) {
      setSystemSetting((prev: SystemSettingInterface) => ({
        ...prev,
        userPicture: img,
      }));
    }
  };

  const cropOnWheel = async (event: React.WheelEvent<HTMLDivElement>) => {
    if (isSystemSetting.pictureCover) {
      const min = 0;
      const max = 100;
      const y = event.deltaY;

      let newSize: number;

      if (y > 0) {
        newSize = isSystemSetting.cropY + 10;
      } else {
        newSize = isSystemSetting.cropY - 10;
      }

      const value = Math.max(min, Math.min(max, newSize));

      return setSystemSetting((prev: SystemSettingInterface) => ({
        ...prev,
        cropY: value,
      }));
    }
  };

  const [play, setPlay] = useState(true);
  const onStartGame = () => {
    setPlay(true);
  };

  const Game = dynamic(() => import("./(components)/game/page"), {
    ssr: false, // Désactive le rendu côté serveur pour ce composant
  });

  useEffect(() => {
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };

    // Utilisation de la fonction
    if (isMobileDevice()) {
      setSystemDetectMobile(true);
    } else {
      setSystemDetectMobile(false);
    }
  }, []);

  const [faceApiPicture, setfaceApiPicture] = useState<string[]>([]);

  async function loadModelsAndDetectFaces() {
    try {
      setSystemSetting((prev: SystemSettingInterface) => ({
        ...prev,
        loader: true,
      }));
      const apiUrl = process.env.NEXT_PUBLIC_FACE_APP_API_URL;

      await faceapi.nets.tinyFaceDetector.loadFromUri(
        `${apiUrl}/assets/models/tiny_face_detector_model/tiny_face_detector_model-weights_manifest.json`
      );
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        `${apiUrl}/assets/models/face_landmark_68_model/face_landmark_68_model-weights_manifest.json`
      );
      await faceapi.nets.faceRecognitionNet.loadFromUri(
        `${apiUrl}/assets/models/face_recognition_model/face_recognition_model-weights_manifest.json`
      );
      if (!isSystemSetting.userPicture) return;
      const img = new window.Image();
      img.src = isSystemSetting.userPicture;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
          toast.error(
            "Aucun visage détecté ( essayé une autre photo de profil )."
          );
          return setSystemSetting((prev: SystemSettingInterface) => ({
            ...prev,
            loader: false,
          }));
        }

        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        if (detections.length === 0) {
          toast.error(
            "Aucun visage détecté ( essayé une autre photo de profil )."
          );
          return setSystemSetting((prev: SystemSettingInterface) => ({
            ...prev,
            loader: false,
          }));
        } else {
          const updatedFaceVisible: Promise<string>[] = detections.map(
            (detection) => {
              return new Promise((resolve, reject) => {
                try {
                  // Créer un nouveau canvas pour chaque détection
                  const canvas = document.createElement("canvas");
                  const context = canvas.getContext("2d", {
                    willReadFrequently: true,
                  });

                  if (!context) {
                    setSystemSetting((prev: SystemSettingInterface) => ({
                      ...prev,
                      loader: false,
                    }));
                    reject("Failed to get canvas context.");
                    return;
                  }

                  // Définir les dimensions du canvas en fonction de la zone de recadrage
                  const cropWidth = detection.detection.box.width;
                  const cropHeight = detection.detection.box.height;
                  canvas.width = cropWidth;
                  canvas.height = cropHeight;

                  // Dessiner la zone de l'image recadrée dans le canvas
                  context.drawImage(
                    img,
                    detection.detection.box.x, // X de la source
                    detection.detection.box.y, // Y de la source
                    cropWidth, // Largeur de la source
                    cropHeight, // Hauteur de la source
                    0, // X de la destination
                    0, // Y de la destination
                    cropWidth, // Largeur de la destination
                    cropHeight // Hauteur de la destination
                  );

                  // Obtenir l'image recadrée sous forme d'URL base64
                  const croppedImageUrl = canvas.toDataURL();

                  // Résoudre la promesse avec l'image recadrée
                  resolve(croppedImageUrl);
                } catch (error) {
                  reject(error); // Gérer les erreurs
                }
              });
            }
          );

          // Traiter toutes les promesses une fois qu'elles sont résolues
          Promise.all(updatedFaceVisible)
            .then((croppedImages) => {
              //console.log(1);

              setSystemSetting((prev: SystemSettingInterface) => ({
                ...prev,
                loader: false,
              }));
              setfaceApiPicture(croppedImages); // Mettre à jour l'état avec les images recadrées
            })
            .catch(() => {
              setSystemSetting((prev: SystemSettingInterface) => ({
                ...prev,
                loader: false,
              }));
            });
        }
      };
    } catch (error) {
      throw new Error("Erreur lors de la détection des visages");
    }
  }

  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const scrollThreshold = 50; // Niveau de défilement à partir duquel masquer la barre de navigation

  useEffect(() => {
    const handleScroll = () => {
      if (!play) return;
      const currentScrollPos = window.pageYOffset;
      const scrollingDown = prevScrollPos < currentScrollPos;

      if (scrollingDown && currentScrollPos > scrollThreshold) {
        setNavbarVisible(false); // Masquer la barre de navigation après le seuil de défilement
      } else {
        setNavbarVisible(true); // Afficher la barre de navigation lorsque vous faites défiler vers le haut ou en dessous du seuil
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, play]);

  const BestProject = Data_Realisation_Personnel.find(
    (el) => el.id === 7482587
  );

  if (!isSystemSetting.theme) return;

  return (
    <>
      <header
        className="w-full bg-[#f8fafc] dark:bg-muted px-4 lg:px-6 py-2 flex items-center justify-between border-b"
        style={{
          zIndex: 5000,
          position: "fixed",
          top: isNavbarVisible ? 0 : -100,
          transition: "300ms",
        }}
      >
        <div className="space-y-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button size={"icon"} className="rounded-full">
                <LuMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-4">
              <div className="mb-1 text-center text-gray-500 text-[12px] font-bold">
                Menu
              </div>
              {Menu?.map((el, index) => (
                <DropdownMenuItem key={index} onClick={el.click}>
                  {el.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:block">
            {Menu?.map((el, index) => (
              <Button
                key={index}
                variant="link"
                className="text-black dark:text-white"
                onClick={el.click}
              >
                {el.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-black dark:text-white">
                Contactez-moi
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contactez-moi</DialogTitle>
                <DialogDescription>
                  Retrouvez tous mes contacts ici.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full max-w-md mx-auto space-y-4">
                <div className="flex items-center space-x-3">
                  <LuPhone className="h-5 w-5 text-primary" />
                  <div className="text-sm hover:underline">
                    {User.telephone}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center space-x-3">
                  <LuMail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:contact@example.com"
                    className="text-sm hover:underline"
                  >
                    {User.email}
                  </a>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center space-x-3">
                  <LuMapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">{User.address}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center space-x-3">
                  <LuClock className="h-5 w-5 text-primary" />
                  <span className="text-sm">{User.time}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Separator orientation="vertical" className="h-12 mx-2" />
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={isSystemSetting.theme === "dark" ? true : false}
              onCheckedChange={(el) => {
                const root = document.documentElement;
                if (!root) return;
                if (el) {
                  root.style.colorScheme = "dark";
                  root.className = "dark";
                  sessionStorage.setItem("theme", "dark");
                  setSystemSetting((prev: SystemSettingInterface) => ({
                    ...prev,
                    theme: "dark",
                  }));
                } else {
                  root.style.colorScheme = "light";
                  root.className = "light";
                  sessionStorage.setItem("theme", "light");
                  setSystemSetting((prev: SystemSettingInterface) => ({
                    ...prev,
                    theme: "light",
                  }));
                }
              }}
            />
            <Label htmlFor="airplane-mode">
              <LuSunMoon className="text-2xl" />
            </Label>
          </div>
        </div>
      </header>
      <div className="flex flex-col min-h-[100dvh]">
        <div
          className={
            "w-screen h-screen fixed bottom-0 object-cover z-[-1] pt-[60px] pb-[60px]"
          }
          style={{
            backgroundImage: `url(${isSystemSetting.pictureCover})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transition: "300ms",
            backgroundPosition: `50% ${isSystemSetting.cropY}%`,
          }}
        />

        <main className="flex-1 text-foreground pt-24">
          <section className="pb-10">
            <div className="container mx-auto py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="flex items-center justify-center">
                <Image
                  src={User.image.src}
                  width={300}
                  height={300}
                  alt={User.firstname}
                  className="rounded-full w-56 h-56 object-cover"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                  onMouseDown={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="space-y-6">
                <div className="text-white">
                  <h2 className="text-6xl">
                    {User.lastname}, {User.firstname}
                  </h2>
                  <h2 className="text-5xl">{User.job}</h2>
                </div>
                <Separator className="my-4 bg-white" />
                <div className="space-y-1 space-x-4">
                  {MenuReseaux?.map((el, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="border-none"
                      onClick={el.click}
                    >
                      <el.icon className="mr-2" />
                      {el.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="py-12 md:pb-16 lg:pb-24 bg-[#f1f5f9] dark:bg-muted">
            <div className="container mx-auto rounded">
              <div className=" text-black dark:text-white">
                <h2 className="text-2xl font-bold" ref={AProposDeMoiRef}>
                  À propos de moi
                </h2>
                <p className="my-8 text-clip overflow-hidden">{User.data[0]}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className=" text-black dark:text-white"
                    >
                      En savoir plus sur moi
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip">
                    <DialogHeader>
                      <DialogTitle>À propos de moi</DialogTitle>
                      <DialogDescription>
                        En savoir plus sur moi
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-full p-4">
                      <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col items-center mb-8">
                          <Image
                            src={User.image.src}
                            width={300}
                            height={300}
                            alt={User.firstname}
                            className="rounded-full w-56 h-56 object-cover"
                            style={{
                              aspectRatio: "300/300",
                              objectFit: "cover",
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <h1 className="mt-4 text-2xl font-bold text-center">
                            {User.firstname}
                          </h1>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                          {User.data?.map((el, index) => (
                            <div key={index}>
                              <p className="w-full max-w-[800px] text-lg">
                                {el}
                              </p>
                              {User.data.length !== index + 1 && (
                                <Separator className="my-4" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Separator className="my-4 bg-black dark:bg-white" />
                <h2 className="text-2xl font-bold" ref={MesCompetencesRef}>
                  Mes competences
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Experience.slice(0, 6)?.map((skill) => (
                    <Card
                      key={skill.title}
                      className="overflow-hidden border-none bg-transparent"
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center space-x-4 text-black dark:text-white">
                          <img
                            src={skill.image.src}
                            alt={`${skill.title} logo`}
                            className="rounded-full object-contain h-[40px] w-[40px]" // `object-contain` maintient le ratio d'aspect
                            onMouseDown={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <CardTitle>{skill.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Progress
                          value={parseInt(skill.progressBar)}
                          className="h-2 mb-2 bg-[#d1d5db]"
                        />
                        <span className="text-sm text-blue-600">
                          {skill.progressBar}% Maîtrisé
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="border-none text-black dark:text-white"
                    >
                      Afficher plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip bg-[#f1f5f9] dark:bg-muted">
                    <DialogHeader>
                      <DialogTitle>Mes competences</DialogTitle>
                      <DialogDescription>
                        De quoi suis-je capable ?
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-full p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Experience?.map((skill) => (
                          <Card
                            key={skill.title}
                            className="overflow-hidden border-none bg-transparent"
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-center space-x-4 text-black dark:text-white">
                                <img
                                  src={skill.image.src}
                                  alt={`${skill.title} logo`}
                                  className="rounded-full object-contain h-[40px] w-[40px]" // `object-contain` maintient le ratio d'aspect
                                  onMouseDown={(e) => e.preventDefault()}
                                  onDragStart={(e) => e.preventDefault()}
                                  onContextMenu={(e) => e.preventDefault()}
                                />
                                <CardTitle>{skill.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <Progress
                                value={parseInt(skill.progressBar)}
                                className="h-2 mb-2 bg-[#d1d5db]"
                              />
                              <span className="text-sm text-blue-600">
                                {skill.progressBar}% Maîtrisé
                              </span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>
          <section className="py-12 md:py-16 lg:py-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 text-black dark:text-white">
              <div ref={TopProjetRef} className="flex justify-center py-8">
                <h2 className="text-white text-4xl font-bold bg-[#1e293b] dark:bg-black p-4 rounded-lg shadow-2xl">
                  Top projet
                </h2>
              </div>
              <div className="container mx-auto p-4">
                <Card className="w-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative flex flex-col md:flex-row">
                      {/* Gradient Background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${bannerBgAdd.src})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          transition: "300ms",
                          backgroundPosition: `50% 50%`,
                        }}
                      />

                      {/* Content */}
                      <div className="relative p-6 md:p-8 text-white md:w-2/3 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold">
                          {BestProject?.title}
                        </h2>
                        <p className="text-sm md:text-base">
                          {BestProject?.description}
                        </p>
                        <p className="text-sm md:text-base">
                          {BestProject?.data.presentation}
                        </p>
                        <DialogInfoRealisations el={BestProject} />
                      </div>

                      {/* Image */}
                      <div className="relative md:w-1/3">
                        {BestProject?.video ? (
                          <>
                            {/*<video
                            className="w-full h-48 md:h-full bg-black"
                            autoPlay={true}
                            controls={true}
                            muted
                            loop
                          >
                            <source src={BestProject?.video} type="video/mp4" />
                          </video>*/}
                            <ReactPlayer
                              url={BestProject?.video}
                              controls
                              width="100%"
                              height="100%"
                            />
                          </>
                        ) : (
                          <img
                            src={BestProject?.image.src}
                            alt="Aperçu du projet"
                            className="w-full h-48 md:h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="p-8">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex justify-center py-8">
                <h2 className="text-white text-4xl font-bold bg-[#1e293b] dark:bg-black p-4 rounded-lg shadow-2xl">
                  Demo video
                </h2>
              </div>
              <div className="flex justify-center py-2">
                <div className="text-white text-center text-1xl font-bold bg-[#1e293b] dark:bg-black p-4 rounded-lg shadow-2xl">
                  Certains enregistrements peuvent présenter des bugs qui ne
                  sont pas présents dans les applications présentées et certains
                  projets ne sont pas complètement terminés
                </div>
              </div>

              <Tabs defaultValue="personnel" className="w-full">
                <TabsList className="w-full bg-[#1e293b] dark:bg-black my-8">
                  <TabsTrigger value="personnel" className="w-full">
                    Personnel
                  </TabsTrigger>
                  <TabsTrigger value="components" className="w-full">
                    Composents
                  </TabsTrigger>
                  <TabsTrigger value="formation" className="w-full">
                    Formation
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="personnel" className="w-full">
                  <CarouselVideo
                    el={Data_Realisation_Personnel.filter(
                      (el) => el.video !== null
                    )}
                  />
                </TabsContent>
                <TabsContent value="components" className="w-full">
                  <CarouselVideo
                    el={DataDemoVideoComposents.filter(
                      (el) => el.video !== null
                    )}
                  />
                </TabsContent>
                <TabsContent value="formation" className="w-full">
                  <CarouselVideo
                    el={Data_Realisation.filter((el) => el.video !== null)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <section className="py-12 md:py-16 lg:py-24 bg-[#f1f5f9] dark:bg-muted">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex justify-center py-8">
                <h2
                  className="text-white text-4xl font-bold bg-[#1e293b] dark:bg-black p-4 rounded-lg shadow-2xl"
                  ref={MesRealisationsRef}
                >
                  Mes réalisations
                </h2>
              </div>
              <Tabs defaultValue="personnel" className="w-full">
                <TabsList className="w-full bg-[#1e293b] dark:bg-black my-8">
                  <TabsTrigger value="personnel" className="w-full">
                    Projets personnel
                  </TabsTrigger>
                  <TabsTrigger value="components" className="w-full">
                    Composents
                  </TabsTrigger>
                  <TabsTrigger value="formation" className="w-full">
                    Projets formation
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="personnel">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Data_Realisation_Personnel?.map((el, index) => (
                      <SubMenuCards el={el} setSrcImg={setSrcImg} key={index} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="components">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DataDemoVideoComposents?.map((el, index) => (
                      <SubMenuCards el={el} setSrcImg={setSrcImg} key={index} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="formation">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Data_Realisation?.map((el, index) => (
                      <SubMenuCards el={el} setSrcImg={setSrcImg} key={index} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <section className="p-0">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex justify-center py-8">
                <h2 className="text-white text-4xl font-bold bg-[#1e293b] dark:bg-black p-4 rounded-lg shadow-2xl">
                  Sandbox
                </h2>
              </div>

              <div className="flex justify-center w-full" ref={SandBoxRef}>
                <Card className="bg-white dark:bg-black mb-8 max-w-[500px]">
                  <CardHeader className="p-4">
                    <CardTitle className="text-black dark:text-white">
                      Sandbox ID
                    </CardTitle>
                    <CardDescription className="text-slate-800 dark:text-white">
                      Ceci permet simplement de personalisé la sandbox.{" "}
                      <span className="text-[#3b82f6]">
                        ( rien n'est enregistrer et cette option est falcultatif
                        )
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 space-y-4 flex flex-col items-center justify-center">
                    <RemoveScroll
                      enabled={isSystemSetting.scroll}
                      removeScrollBar={false}
                      className="w-full"
                    >
                      <Button
                        variant="default"
                        className="w-full mb-4"
                        onClick={handleResetSystem}
                      >
                        reset all
                        <LuRefreshCcw className="ml-2" />
                      </Button>
                      <div
                        className="relative w-full group cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClickImport(fileInputRef.current);
                        }}
                        onMouseEnter={() => {
                          if (systemDetectMobile) return;
                          setSystemSetting((prev: SystemSettingInterface) => ({
                            ...prev,
                            scroll: true,
                          }));
                        }}
                        onMouseLeave={() => {
                          if (systemDetectMobile) return;
                          setSystemSetting((prev: SystemSettingInterface) => ({
                            ...prev,
                            scroll: false,
                          }));
                        }}
                        onWheel={(e) => {
                          if (systemDetectMobile) return;
                          cropOnWheel(e);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setSrcImg(isSystemSetting.pictureCover);
                        }}
                      >
                        <div
                          className="CoverImage FlexEmbed FlexEmbed--2by1"
                          style={{
                            width: "100%",
                            backgroundImage: `url(${isSystemSetting.pictureCover})`,
                            backgroundPosition: `50% ${isSystemSetting.cropY}%`,
                            borderRadius: 0,
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full transition group-hover:bg-[#000000]/75 flex flex-col justify-center items-center gap-2">
                          <Button
                            variant="default"
                            className="transition opacity-0 group-hover:opacity-100"
                          >
                            Modifier
                            <LuPen className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    </RemoveScroll>
                    <Slider
                      value={[isSystemSetting.cropY]}
                      max={100}
                      step={10}
                      onValueChange={(e: number[]) => {
                        setSystemSetting((prev: SystemSettingInterface) => ({
                          ...prev,
                          cropY: e[0],
                        }));
                      }}
                    />
                    <div
                      className="relative w-40 group cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleButtonClickImport(fileInputRef2.current);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setSrcImg(isSystemSetting.userPicture);
                      }}
                    >
                      <img
                        src={isSystemSetting.userPicture}
                        alt=""
                        className="rounded-full w-40 h-40 object-cover hover:scale-95 hover:cursor-pointer"
                        onMouseDown={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <div className="absolute rounded-full top-0 left-0 w-full h-full transition group-hover:bg-[#000000]/75 flex justify-center items-center">
                        <Button
                          variant="default"
                          className="transition opacity-0 group-hover:opacity-100"
                        >
                          Modifier
                          <LuPen className="ml-2" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      className="text-black dark:text-white"
                      onBlur={(e) => {
                        if (isSystemSetting.pseudo === "") {
                          setSystemSetting((prev: SystemSettingInterface) => ({
                            ...prev,
                            pseudo: "defaultUser",
                          }));
                        }
                      }}
                      onChange={(e) => {
                        setSystemSetting((prev: SystemSettingInterface) => ({
                          ...prev,
                          pseudo: e.target.value,
                        }));
                      }}
                      value={isSystemSetting.pseudo}
                      type="text"
                      placeholder="( User )"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...DataDemoVideoComposents, ...Data_Realisation_Personnel]
                  .filter((el) => el.sandBox === true)
                  ?.map((el, index) => (
                    <Card
                      key={index}
                      className="bg-white dark:bg-black border-none flex flex-col justify-between items-center"
                    >
                      <CardHeader className="w-full">
                        <CardTitle className="text-black dark:text-white">
                          {el.title}
                        </CardTitle>
                        <CardDescription className="text-slate-800 dark:text-white">
                          {el.description}
                        </CardDescription>
                        <div className="flex gap-2 mt-4">
                          {el.platforms?.map((el: any, index: any) => (
                            <Badge variant="default" key={index}>
                              {el}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        {el.image && (
                          <img
                            className="max-h-[200px]"
                            src={el.image.src}
                            onMouseDown={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={() => {
                              setSrcImg(el.image.src);
                            }}
                          />
                        )}
                      </CardContent>
                      <CardContent className="w-full flex gap-2 flex-wrap">
                        {el.languages?.map((language: any, index: any) => (
                          <Badge
                            variant="default"
                            className="text-white"
                            key={index}
                            style={{ background: language.color }}
                          >
                            {language.name}
                          </Badge>
                        ))}
                      </CardContent>
                      <CardContent className="w-full">
                        {el.sandBoxInfo && (
                          <div className="text-[#f59e0b]">{el.sandBoxInfo}</div>
                        )}
                      </CardContent>
                      <CardFooter className="w-[100%]">
                        <Button
                          className="w-[100%]"
                          onClick={() => {
                            if (el.id === 42575874) {
                              setSrcImg(isSystemSetting.pictureCover);
                            }
                            if (el.id === 974325) {
                              setPlay(false);
                              return toast(
                                "Certaines parties de la page seront inaccessibles jusqu’à la fermeture du jeu.",
                                {
                                  icon: "🙂",
                                }
                              );
                            }
                            if (el.id === 5487375) {
                              SandBoxRef.current?.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                            if (el.id === 7458278) {
                              return toast("Rendez-vous sur Kitsune-Studio.", {
                                icon: "🙂",
                              });
                            }
                            if (el.id === 656154) {
                              if (
                                isSystemSetting.userPicture ===
                                imgDefaultUser.src
                              )
                                return toast.error(
                                  "Utilisé une image de profile avec la SandBox ID et revenez ici."
                                );
                              loadModelsAndDetectFaces();
                            }
                            if (el.id === 7482587) {
                              return toast.error(
                                "Non disponible pour le moment."
                              );
                            }
                          }}
                        >
                          Essayez l’option
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>

            {!play && (
              <div className="flex justify-center items-center min-h-screen">
                <Game
                  onClick={onStartGame}
                  userPseudo={isSystemSetting.pseudo}
                  userImg={isSystemSetting.userPicture}
                  userLevel={isSystemSetting.levelUser}
                />
              </div>
            )}
            <Dialog
              open={faceApiPicture.length > 0}
              onOpenChange={(e: boolean) => {
                if (!e) {
                  setfaceApiPicture([]);
                }
              }}
            >
              <DialogContent className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip">
                <DialogHeader>
                  <DialogTitle>Face API</DialogTitle>
                  <DialogDescription>
                    Face api à détecté {faceApiPicture.length} visages sur votre
                    image.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-full p-4">
                  <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {faceApiPicture?.map((img: string, index: number) => (
                        <div
                          className="flex flex-col items-center gap-4"
                          key={index}
                        >
                          <img
                            src={img}
                            className="rounded w-full h-full object-cover"
                            onMouseDown={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </section>
        </main>
        <footer className="bg-[#0f172a] dark:bg-black text-primary-foreground mt-8 px-4 lg:px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-white">
            &copy; 2024 {User.lastname} {User.firstname}. All rights reserved.
          </p>
        </footer>

        <Input
          id="picture"
          type="file"
          ref={fileInputRef}
          multiple={false}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
          onChange={handleChangeCover}
        />
        <Input
          id="picture"
          type="file"
          ref={fileInputRef2}
          multiple={false}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
          onChange={handleChangeUser}
        />
      </div>
      <LoaderApp name={""} open={isSystemSetting.loader} />
      <ViewerImage srcImg={srcImg} setSrcImg={setSrcImg} />

      <Dialog
        open={isSystemSetting.open === "cv"}
        onOpenChange={(e: boolean) => {
          if (!e) {
            setSystemSetting((prev: SystemSettingInterface) => ({
              ...prev,
              open: null,
            }));
          }
        }}
      >
        <DialogContent className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip">
          <DialogHeader>
            <DialogTitle>CV</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <iframe
            src="/assets/cv/CV.pdf"
            width="100%"
            height="100%"
            //style="border: none;"
          ></iframe>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isSystemSetting.open === "formation"}
        onOpenChange={(e: boolean) => {
          if (!e) {
            setSystemSetting((prev: SystemSettingInterface) => ({
              ...prev,
              open: null,
            }));
          }
        }}
      >
        <DialogContent className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip">
          <DialogHeader>
            <DialogTitle>Formation</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full p-4">
            {FormationData?.map((el, index) => (
              <div key={index}>
                <div className="container mx-auto px-4 py-8">
                  <div className="flex flex-col items-center mb-8">
                    <Image
                      src={el.image.src}
                      width={300}
                      height={300}
                      alt={el.title}
                      className="rounded w-full max-w-[500px] h-56 object-cover"
                      onMouseDown={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <h1 className="mt-4 text-2xl font-bold text-center">
                      {el.title}
                    </h1>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    {el.data?.map((elData, index) => (
                      <div key={index}>
                        <p className="w-full max-w-[800px] text-lg">{elData}</p>
                        {el.data.length !== index + 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {FormationData.length !== index + 1 && (
                  <div className="flex justify-center items-center py-8">
                    <LuArrowUpFromDot className="text-4xl" />
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
