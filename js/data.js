/* Amaan Door & Hardware Suppliers — catalog data
   Each image reference is a "slug" that maps to:
     img/thumb/<slug>.webp  (small, fast-loading preview)
     img/full/<slug>.webp   (large, high-quality — used in the zoom viewer)
*/

const CATALOG = {
  doors: {
    title: "Doors",
    cover: "apple-doors-4",
    blurb: "Premium factory-finished doors from trusted brands.",
    groups: [
      {
        label: "Apple Doors",
        items: [
          { img: "apple-doors-1", name: "Apple Doors" },
          { img: "apple-doors-2", name: "Apple Doors" },
          { img: "apple-doors-3", name: "Apple Doors" },
          { img: "apple-doors-4", name: "Apple Doors" },
          { img: "apple-doors-5", name: "Apple Doors" },
        ],
      },
      {
        label: "Swaraj (Neply) Doors",
        items: [
          { img: "neply-door-1", name: "Swaraj (Neply) Door" },
          { img: "neply-door-2", name: "Swaraj (Neply) Door" },
          { img: "neply-door-3", name: "Swaraj (Neply) Door" },
          { img: "neply-door-4", name: "Swaraj (Neply) Door" },
          { img: "neply-door-5", name: "Swaraj (Neply) Door" },
          { img: "neply-door-6", name: "Swaraj (Neply) Door" },
          { img: "neply-door-7", name: "Swaraj (Neply) Door" },
          { img: "neply-door-8", name: "Swaraj (Neply) Door" },
          { img: "neply-door-9", name: "Swaraj (Neply) Door" },
        ],
      },
    ],
  },

  ply: {
    title: "Ply",
    cover: "ply-cover",
    groups: [
      {
        items: [
          { img: "ply-swaraj", name: "Swaraj Ply" },
          { img: "ply-sheet", name: "Plywood Sheet" },
          { img: "ply-plywood", name: "Plywood" },
        ],
      },
    ],
  },

  laminates: {
    title: "Laminates",
    cover: "laminates-cover",
    groups: [
      {
        label: "Premium Catalogue",
        items: [
          { img: "laminates-premium-cat", name: "Premium Catalogue", pdf: "img/premium-1.pdf" },
          { img: "laminates-starline-cat", name: "StarLine Catalogue", pdf: "img/premium-2.pdf" },
        ],
      },
      {
        label: "Standard",
        items: [
          { img: "laminate-4", name: "Standard Laminate" },
          { img: "laminate-5", name: "Standard Laminate" },
          { img: "laminate-6", name: "Standard Laminate" },
        ],
      },
    ],
  },

  glass: {
    title: "Glass",
    cover: "glass-cover",
    blurb: "Glass of different thickness available. Please contact for more information.",
    groups: [
      {
        items: [
          { img: "glass-3", name: "Glass" },
          { img: "glass-4", name: "Glass" },
          { img: "glass-7", name: "Glass" },
        ],
      },
    ],
  },

  hardware: {
    title: "Hardware",
    cover: "hardware-cover",
    groups: [
      {
        label: "Door Handles",
        items: [
          { img: "door-handle-1", name: "Door Handle" },
          { img: "door-handle-2", name: "Door Handle" },
          { img: "door-handle-3", name: "Door Handle" },
          { img: "door-handle-4", name: "Door Handle" },
          { img: "door-handle-5", name: "Door Handle" },
          { img: "door-handle-6", name: "Door Handle" },
        ],
      },
      {
        label: "Door Hinges",
        items: [
          { img: "door-hinge-1", name: "Door Hinge" },
          { img: "door-hinge-2", name: "Door Hinge" },
          { img: "door-hinge-3", name: "Door Hinge" },
        ],
      },
      {
        label: "Door Magnets",
        items: [
          { img: "door-magnet-1", name: "Door Magnet" },
          { img: "door-magnet-2", name: "Door Magnet" },
          { img: "door-magnet-3", name: "Door Magnet" },
        ],
      },
      {
        label: "Door Stoppers",
        items: [
          { img: "door-stopper-1", name: "Door Stopper" },
          { img: "door-stopper-2", name: "Door Stopper" },
          { img: "door-stopper-3", name: "Door Stopper" },
        ],
      },
      {
        label: "Mortice Locks",
        items: [
          { img: "mortice-lock-1", name: "Mortice Lock" },
          { img: "mortice-lock-3", name: "Mortice Lock" },
          { img: "mortice-lock-5", name: "Mortice Lock" },
        ],
      },
      {
        label: "Aldrops",
        items: [
          { img: "aldrop-1", name: "Aldrop" },
          { img: "aldrop-2", name: "Aldrop" },
          { img: "aldrop-3", name: "Aldrop" },
          { img: "aldrop-4", name: "Aldrop" },
          { img: "aldrop-5", name: "Aldrop" },
        ],
      },
    ],
  },

  nets: {
    title: "Nets",
    cover: "net-standard",
    groups: [
      {
        label: "Nets",
        items: [
          { img: "net-barfi", name: "Barfi Net" },
          { img: "net-standard", name: "Net" },
        ],
      },
      {
        label: "Nets Rod for Bed",
        blurb: "Available in both Stainless Steel and Aluminium.",
        items: [{ img: "net-rod", name: "Nets Rod for Bed" }],
      },
    ],
  },

  beats: {
    title: "Beats",
    cover: "beats-1",
    groups: [
      {
        items: [
          { img: "beats-1", name: "Beats" },
          { img: "beats-2", name: "Beats" },
          { img: "beats-3", name: "Beats" },
          { img: "beats-4", name: "Beats" },
          { img: "beats-5", name: "Beats" },
          { img: "beats-6", name: "Beats" },
          { img: "beats-7", name: "Beats" },
          { img: "beats-8", name: "Beats" },
          { img: "beats-9", name: "Beats" },
        ],
      },
    ],
  },

  adhesive: {
    title: "Adhesive",
    cover: "adhesive-marine-1",
    groups: [
      {
        label: "Pidilite (Fevicol)",
        items: [
          { img: "adhesive-marine-1", name: "Marine Adhesive" },
          { img: "adhesive-marine-2", name: "Marine Adhesive" },
          { img: "adhesive-pidilite", name: "Pidilite Adhesive" },
        ],
      },
      {
        label: "Karigar",
        items: [
          { img: "karigar-superfast-1", name: "Karigar SuperFast" },
          { img: "karigar-adhesive", name: "Karigar Adhesive" },
          { img: "karigar-superfast-2", name: "Karigar SuperFast" },
        ],
      },
    ],
  },

  pvc_edge: {
    title: "PVC Edge Banding",
    cover: "pvc-edge-1",
    groups: [
      {
        items: [
          { img: "pvc-edge-1", name: "PVC Edge Banding" },
          { img: "pvc-edge-2", name: "PVC Edge Banding" },
          { img: "pvc-edge-3", name: "PVC Edge Banding" },
        ],
      },
    ],
  },

  kitchen_tools: {
    title: "Kitchen Tools",
    cover: "kitchen-cover",
    blurb: "Brand: Century",
    groups: [
      {
        items: [
          { img: "kitchen-1", name: "Kitchen Tools" },
          { img: "kitchen-2", name: "Kitchen Tools" },
          { img: "kitchen-3", name: "Kitchen Tools" },
          { img: "kitchen-4", name: "Kitchen Tools" },
          { img: "kitchen-5", name: "Kitchen Tools" },
          { img: "kitchen-6", name: "Kitchen Tools" },
          { img: "kitchen-7", name: "Kitchen Tools" },
          { img: "kitchen-8", name: "Kitchen Tools" },
          { img: "kitchen-tools-poster", name: "Kitchen Tools" },
        ],
      },
    ],
  },
};

const CATEGORY_ORDER = [
  "doors",
  "ply",
  "laminates",
  "glass",
  "hardware",
  "nets",
  "beats",
  "adhesive",
  "pvc_edge",
  "kitchen_tools",
];
