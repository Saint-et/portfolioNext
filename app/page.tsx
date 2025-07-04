"use client";

import {
  bannerBg,
  bannerBg2,
  bannerBgAdd,
  Data_Realisation,
  Data_Realisation_Personnel,
  DataDemoVideoComposents,
  Experience,
  FormationData,
  imgDefaultUser,
  User,
} from "@/public/assets/data/Data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  LuArrowUpFromDot,
  LuBadge,
  LuBookOpen,
  LuClock,
  LuGithub,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhone,
  LuSunMoon,
} from "react-icons/lu";
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
import ViewerImage from "./(components)/viewer-image";
import LoaderApp from "./(components)/loader";
import { ArrowRight } from "lucide-react";
import DialogInfoRealisations from "./(components)/dialog-info-realisation";
import ReactPlayer from "react-player";
import Link from "next/link";

type SystemDialogType = "cv" | "formation" | null;
interface SystemSettingInterface {
  theme: string;
  pseudo: string;
  userPicture: string;
  pictureCover: string;
  pictureCover2: string;
  levelUser: number;
  scroll: boolean;
  cropY: number;
  loader: boolean;
  open: SystemDialogType;
}

export default function Home() {
  const [isSystemSetting, setSystemSetting] = useState<SystemSettingInterface>({
    theme: "",
    pseudo: "defaultUser",
    userPicture: imgDefaultUser.src,
    pictureCover: bannerBg.src,
    pictureCover2: bannerBg2.src,
    levelUser: 0,
    scroll: false,
    cropY: 50,
    loader: false,
    open: null,
  });

  const AProposDeMoiRef = useRef<HTMLDivElement | null>(null);
  const MesCompetencesRef = useRef<HTMLDivElement | null>(null);
  const TopProjetRef = useRef<HTMLDivElement | null>(null);
  const MesRealisationsRef = useRef<HTMLDivElement | null>(null);
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
    {
      title: "Github",
      icon: LuGithub,
      click: () => {
        window.open("https://github.com/Saint-et", "_blank");
      },
    },
  ];

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

  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isClient, setIsClient] = useState(false); // État pour vérifier si on est côté client
  const scrollThreshold = 50; // Niveau de défilement à partir duquel masquer la barre de navigation

  useEffect(() => {
    setIsClient(true); // On est côté client, donc on peut accéder à `window`
  }, []);

  useEffect(() => {
    if (!isClient) return; // Ne pas exécuter le code si ce n'est pas côté client

    const handleScroll = () => {
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
  }, [prevScrollPos, isClient]); // Ajoutez `isClient` comme dépendance

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
            backgroundImage:
              isSystemSetting.theme === "light"
                ? `url(${isSystemSetting.pictureCover})`
                : `url(${isSystemSetting.pictureCover2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
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
              <div className="space-y-6 drop-shadow-lg">
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

          <section className="py-12 md:pb-16 lg:pb-24 bg-[#f1f5f9] dark:bg-muted">
            <div className="container mx-auto rounded">
              <div className=" text-black dark:text-white">
                <h2 className="text-2xl font-bold" ref={AProposDeMoiRef}>
                  Note personnel
                </h2>
                <p className="my-8 text-clip overflow-hidden">{User.note}</p>
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

                        <div className="space-x-2">
                          <DialogInfoRealisations el={BestProject} />
                          {BestProject?.link && (
                            <Button
                              asChild
                              size={"icon"}
                              className="bg-slate-700"
                            >
                              <Link target="_blank" href={BestProject?.link}>
                                <LuGithub />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative md:w-1/3">
                        {BestProject?.video ? (
                          <>
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
                <TabsList className="flex flex-col md:flex-row w-full bg-[#1e293b] dark:bg-black my-8 h-max">
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
                <TabsList className="flex flex-col md:flex-row w-full bg-[#1e293b] dark:bg-black my-8 h-max">
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
        </main>

        <footer className="bg-[#0f172a] dark:bg-black text-primary-foreground px-4 lg:px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-white">
            &copy; 2024 {User.lastname} {User.firstname}. All rights reserved.
          </p>
        </footer>
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
