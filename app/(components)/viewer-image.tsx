"use client";

// Converted TSX Component
import { RemoveScroll } from "react-remove-scroll";
import React, { useEffect, useRef, useState } from "react";

interface ViewerImageProps {
  srcImg: string;
  setSrcImg: React.Dispatch<React.SetStateAction<string>>;
}

// Use the interface in the functional component
const ViewerImage: React.FC<ViewerImageProps> = (props) => {
  const [systemDetectMobile, setSystemDetectMobile] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [landscape, setLandscape] = useState<boolean>(false);
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);
  const [filterImg, setFilterImg] = useState<boolean>(false);
  const [devTools, setDevTools] = useState<boolean>(false);
  const [Commands, setCommands] = useState<boolean>(false);

  const minZoomT = 0.6;
  const maxZoomT = 3.6;
  const minZoom = 1;
  const maxZoom = 3;

  const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const newZoomLevel = e.deltaY < 0 ? zoomLevel + 0.1 : zoomLevel - 0.1;

    if (newZoomLevel >= minZoomT && newZoomLevel <= maxZoomT) {
      setZoomLevel(newZoomLevel);

      if (newZoomLevel <= minZoom) {
        setPosition({ x: 0, y: 0 });
      } else {
        if (newZoomLevel < zoomLevel) {
          setPosition({ x: position.x / 1.3, y: position.y / 1.3 });
        }
      }
    }

    if (maxZoom < newZoomLevel) {
      setTimeout(() => {
        setZoomLevel(maxZoom);
      }, 200);
    }

    if (minZoom > newZoomLevel) {
      setTimeout(() => {
        setZoomLevel(minZoom);
      }, 200);
    }
  };

  const handleTouchZoom = () => {
    if (zoomLevel === 3) {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    } else if (zoomLevel >= 1 && zoomLevel < 1.5) {
      setZoomLevel(1.5);
    } else if (zoomLevel >= 1.5 && zoomLevel < 2) {
      setZoomLevel(2);
    } else if (zoomLevel >= 2 && zoomLevel < 3) {
      setZoomLevel(3);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel === 1 || !isDragging || minZoom > zoomLevel) return;

    if (imageRef.current && containerRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const deltaX = imageRect.width - containerRect.width;
      const deltaY = imageRect.height - containerRect.height;

      const dx = e.clientX - startPosition.x;
      const dy = e.clientY - startPosition.y;
      // Calculer les nouvelles valeurs x et y en prenant en compte les limites du cadre
      const newPosX = Math.min(
        Math.max(position.x + dx, -deltaX / 2),
        deltaX / 2
      );
      const newPosY = Math.min(
        Math.max(position.y + dy, -deltaY / 2),
        deltaY / 2
      );

      setStartPosition({ x: e.clientX, y: e.clientY });

      if (
        imageRect.height <= containerRect.height &&
        imageRect.width <= containerRect.width
      ) {
        if (
          imageRect.width <= containerRect.width &&
          imageRect.height <= containerRect.height
        ) {
          return setPosition({ x: 0, y: 0 });
        }
        if (imageRect.width < containerRect.width) {
          return setPosition({ x: 0, y: newPosY });
        }
        if (imageRect.height < containerRect.height) {
          return setPosition({ x: newPosX, y: 0 });
        }
      }

      if (imageRect.height > containerRect.height) {
        if (imageRect.width < containerRect.width) {
          return setPosition({ x: 0, y: newPosY });
        }
      }

      if (imageRect.width > containerRect.width) {
        if (imageRect.height < containerRect.height) {
          return setPosition({ x: newPosX, y: 0 });
        }
      }

      setPosition({ x: newPosX, y: newPosY });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    //e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    //e.preventDefault();

    if (imageRef.current && containerRef.current) {
      if (e.touches.length !== 2 && minZoom < zoomLevel) {
        const touch = e.touches[0];

        const imageRect = imageRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const deltaX = imageRect.width - containerRect.width;
        const deltaY = imageRect.height - containerRect.height;

        const dx = touch.clientX - startPosition.x;
        const dy = touch.clientY - startPosition.y;

        // Calculer les nouvelles valeurs x et y en prenant en compte les limites du cadre
        const newPosX = Math.min(
          Math.max(position.x + dx, -deltaX / 2),
          deltaX / 2
        );
        const newPosY = Math.min(
          Math.max(position.y + dy, -deltaY / 2),
          deltaY / 2
        );

        setStartPosition({ x: touch.clientX, y: touch.clientY });

        if (
          imageRect.height <= containerRect.height &&
          imageRect.width <= containerRect.width
        ) {
          if (
            imageRect.width <= containerRect.width &&
            imageRect.height <= containerRect.height
          ) {
            return setPosition({ x: 0, y: 0 });
          }
          if (imageRect.width < containerRect.width) {
            return setPosition({ x: 0, y: newPosY });
          }
          if (imageRect.height < containerRect.height) {
            return setPosition({ x: newPosX, y: 0 });
          }
        }

        if (imageRect.height > containerRect.height) {
          if (imageRect.width < containerRect.width) {
            return setPosition({ x: 0, y: newPosY });
          }
        }

        if (imageRect.width > containerRect.width) {
          if (imageRect.height < containerRect.height) {
            return setPosition({ x: newPosX, y: 0 });
          }
        }

        setPosition({ x: newPosX, y: newPosY });
      } else {
        if (e.touches.length === 2) {
          return setTimeout(() => {
            handleCloseViewer();
          }, 200);
        }
        const endY = e.changedTouches[0].clientY; // Récupère la position Y du toucher final
        const deltaY = endY - startPosition.y; // Calcule la différence de position Y

        const endX = e.changedTouches[0].clientX; // Récupère la position Y du toucher final
        const deltaX = endX - startPosition.x; // Calcule la différence de position Y

        // Vérifie si le mouvement est un swipe vers le haut et si la distance parcourue est suffisante
        if (deltaY < -100) {
          // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
          return setTimeout(() => {
            handleDoubleClick();
          }, 200);
        }
        if (deltaY > 100) {
          // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
          return setTimeout(() => {
            handleDoubleClick();
          }, 200);
        }

        // Vérifie si le mouvement est un swipe vers le haut et si la distance parcourue est suffisante
        if (deltaX < -100) {
          // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
          return setTimeout(() => {
            setCommands(true);
          }, 200);
        }
        if (deltaX > 100) {
          // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
          return setTimeout(() => {
            setFilterImg(!filterImg);
          }, 200);
        }
      }
    }
  };

  const handletouchEnd = () => {
    setIsDragging(false);
  };

  const handleCloseViewer = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      props.setSrcImg("");
      setDevTools(false);
      setCommands(false);
      setPosition({ x: 0, y: 0 });
      setZoomLevel(1);
      setIsDragging(false);
      setCloseAnimation(false);
    }, 280);
  };

  const handleDoubleClick = () => {
    if (zoomLevel > 1) {
      setIsDragging(false);
      setZoomLevel(1);
      return setPosition({ x: 0, y: 0 });
    }

    setCloseAnimation(true);
    setTimeout(() => {
      props.setSrcImg("");
      setDevTools(false);
      setCommands(false);
      setPosition({ x: 0, y: 0 });
      setZoomLevel(1);
      setIsDragging(false);
      setCloseAnimation(false);
    }, 280);
  };

  const imageSize = (landscape: boolean | undefined) => {
    if (zoomLevel === 1) {
      if (imageRef.current && containerRef.current) {
        setPosition({ x: 0, y: 0 });
        setZoomLevel(1);
        setIsDragging(false);
        const imageRect = imageRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        if (systemDetectMobile) {
          if (landscape) {
            setHeight("max-content");
            return setWidth("max-content");
          } else {
            if (imageRect.width < containerRect.width) {
              if (imageRect.height < containerRect.height) {
                setHeight("max-content");
                return setWidth("max-content");
              } else {
                setHeight("100%");
                return setWidth("max-content");
              }
            }
            setHeight("max-content");
            return setWidth("100%");
          }
        }

        if (imageRect.width - imageRect.height < 100) {
          setWidth("max-content");
          return setHeight("max-content");
        }
        if (imageRect.width > imageRect.height) {
          setHeight("max-content");
          return setWidth("100vh");
        }
        if (imageRect.width == imageRect.height) {
          setHeight("100%");
          setWidth("max-content");
        }
      }
    }
  };

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

  useEffect(() => {
    if (!systemDetectMobile) {
      return;
    }

    // Définir une media query pour l'orientation paysage
    const landscapeQuery = window.matchMedia("(orientation: landscape)");

    // Fonction pour gérer les changements d'orientation
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // L'appareil est en mode paysage
        setLandscape(true);
        imageSize(true);
        // Effectuer des actions spécifiques au mode paysage
      } else {
        // L'appareil n'est pas en mode paysage
        setLandscape(false);
        imageSize(false);
        // Effectuer des actions spécifiques au mode portrait
      }
    };

    // Attacher un écouteur pour les changements d'orientation
    landscapeQuery.addEventListener("change", handleOrientationChange);

    // Vérification initiale de l'orientation de l'appareil
    if (landscapeQuery.matches) {
      setLandscape(true);
      imageSize(true);
    } else {
      setLandscape(false);
      imageSize(false);
    }

    // Nettoyage des écouteurs lorsque le composant est démonté
    return () => {
      landscapeQuery.removeEventListener("change", handleOrientationChange);
    };
  }, [systemDetectMobile]);

  const filter = filterImg
    ? {
        filter: `
    contrast(${110}%)
    saturate(${120}%)
    `,
      }
    : null;

  useEffect(() => {
    if (!props.srcImg) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "z": // Action pour 'z'
          setTimeout(() => {
            handleTouchZoom();
          }, 300);
          break;
        case "f": // Action pour 'f'
          setTimeout(() => {
            setFilterImg(!filterImg);
          }, 300);
          break;
        case "d": // Action pour 'd'
          setTimeout(() => {
            setDevTools(!devTools);
          }, 300);
          break;
        case "c": // Action pour 'c'
          setTimeout(() => {
            setCommands(!Commands);
          }, 300);
          break;
        case "Escape": // Action pour 'Escape'
          setTimeout(() => {
            handleCloseViewer();
          }, 300);
          break;
        // Ajouter d'autres touches si nécessaire
        default:
          break;
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.srcImg, devTools, filterImg, Commands, zoomLevel]);

  if (!props.srcImg) return null;

  return (
    <RemoveScroll
      removeScrollBar={true}
      style={{
        zIndex: 100000,
        width: "100%",
        height: "100vh",
        background: "#00000088",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        padding: 0,
      }}
    >
      {devTools && (
        <div
          className="open-element-page-melted"
          style={{
            width: "max-content",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            position: "fixed",
            zIndex: 50000,
            top: "98%",
            left: "2%",
            transform: "translate(2%, -98%)",
            background: "#000000",
            border: "1px solid grey",
            color: "white",
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <h4 style={{ margin: 5, width: "100%", textAlign: "center" }}>
            Developer
          </h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>mode: {systemDetectMobile ? "Mobile" : "Pc"}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>landscape: {landscape ? "🔵" : "🔴"}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>dragging: {isDragging ? "🔵" : "🔴"}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>animated: {!isDragging ? "🔵" : "🔴"}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>width: {width}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>height: {height}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>
              m-position: {startPosition.x.toFixed(1)} x,{" "}
              {startPosition.y.toFixed(1)} y
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>
              position: {position.x.toFixed(1)} x, {position.y.toFixed(1)} y
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <div>
              min-z: {minZoom.toFixed(1)}🔷 / {minZoomT.toFixed(1)}🔶
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              max-z: {maxZoom.toFixed(1)}🔷 / {maxZoomT.toFixed(1)}🔶
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <div>Bright-color:</div>
            <button
              onClick={() => {
                setFilterImg(!filterImg);
              }}
              type="button"
              style={{
                background: "#212121",
                marginLeft: 10,
                borderRadius: 5,
                padding: 3,
                fontSize: 12,
              }}
            >
              {filterImg ? "on" : "off"}
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <div>zoom: {zoomLevel.toFixed(1)}x</div>
            <button
              onClick={handleTouchZoom}
              type="button"
              style={{
                background: "#212121",
                marginLeft: 10,
                borderRadius: 5,
                padding: 3,
                fontSize: 12,
              }}
            >
              mobile zoom
            </button>
          </div>
        </div>
      )}
      {Commands && (
        <div
          className="open-element-page-melted"
          style={{
            width: "98%",
            maxWidth: "max-content",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            position: "fixed",
            zIndex: 50000,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#000000",
            border: "1px solid grey",
            color: "white",
            padding: 5,
          }}
          onClick={() => {
            if (!systemDetectMobile) return;
            setCommands(false);
          }}
        >
          <h4
            style={{
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid grey",
            }}
          >
            Commands pc
          </h4>
          <ul className="space-y-4">
            <li>
              <span style={{ color: "#3b82f6" }}>DoubleClick:</span> Reset zoom
              / Close viewer-image
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>Escape:</span> Close
              viewer-image
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>C:</span> See all commands
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>F:</span> Apply color filter
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>D:</span> Mode developer
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>Z:</span> Zoom
            </li>
          </ul>
          <h4
            style={{
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid grey",
              borderTop: "1px solid grey",
            }}
          >
            Commands mobile
          </h4>
          <ul className="space-y-4">
            <li>
              <span style={{ color: "#3b82f6" }}>maintain touch:</span> Reset
              zoom / Close viewer-image
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>
                swipe Up/Down on zoom 1.0x:
              </span>{" "}
              Close viewer-image
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>swipe left on zoom 1.0x:</span>{" "}
              Apply color filter
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>
                swipe right on zoom 1.0x:
              </span>{" "}
              See all commands
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>2 touch same time:</span> Close
              viewer-image
            </li>
            <li>
              <span style={{ color: "#3b82f6" }}>Double touch:</span> Zoom
            </li>
          </ul>
        </div>
      )}
      <div
        ref={containerRef}
        onWheel={handleMouseWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDoubleClick={
          !systemDetectMobile ? handleDoubleClick : handleTouchZoom
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handletouchEnd}
        onContextMenu={(e) => {
          e.preventDefault();
          if (systemDetectMobile) {
            handleDoubleClick();
          } else {
            handleTouchZoom();
          }
        }}
        className="flex h-full w-full overflow-hidden items-center justify-center flex-shrink m-0 p-0"
        style={{ cursor: minZoom < zoomLevel ? "all-scroll" : "default" }}
      >
        <img
          className={
            closeAnimation
              ? "close-element-page-scale"
              : "open-element-page-melted"
          }
          ref={imageRef}
          onLoad={() => {
            imageSize(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src={props.srcImg}
          alt="Image"
          style={{
            display: "block",
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            transition: !isDragging ? "transform 250ms ease-in-out" : "",
            objectFit: "contain",
            height: height,
            width: width,
            maxWidth: "100vh",
            maxHeight: "100vh",
            overflow: "clip",
            ...filter,
          }}
        />
      </div>
    </RemoveScroll>
  );
};

export default ViewerImage;
