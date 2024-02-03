import {
  Asterisk,
  Bookmark,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleEqual,
  EqualIcon,
  Eye,
  GripVertical,
  Heart,
  Instagram,
  LayoutDashboard,
  LucideIcon,
  LucideProps,
  Menu,
  MinusCircle,
  Moon,
  PlusCircle,
  Search,
  ShoppingCart,
  Square,
  SunMedium,
  Twitter,
  UserCircle,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  Menu: (props: LucideProps) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  Spinner: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  Search: Search,
  Bookmark: Bookmark,
  Instagram: Instagram,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  ChevronUp: ChevronUp,
  ChevronDown: ChevronDown,
  Cart: ShoppingCart,
  Heart: Heart,
  Square: Square,
  Aterisk: Asterisk,
  MinusCircle: MinusCircle,
  PlusCircle: PlusCircle,
  EqualCircle: CircleEqual,
  CheckCircle: CheckCircle,
  UserCircle: UserCircle,
  Dashboard: LayoutDashboard,
  Eye: Eye,
  // Menu: Menu,
  Grip: GripVertical,
}
const FormatAlignLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M1.00028 2.9654H9.85742C9.936 2.9654 10.0003 2.90112 10.0003 2.82254V1.82254C10.0003 1.74397 9.936 1.67969 9.85742 1.67969H1.00028C0.921708 1.67969 0.857422 1.74397 0.857422 1.82254V2.82254C0.857422 2.90112 0.921708 2.9654 1.00028 2.9654ZM1.00028 10.5368H9.85742C9.936 10.5368 10.0003 10.4725 10.0003 10.394V9.39397C10.0003 9.3154 9.936 9.25112 9.85742 9.25112H1.00028C0.921708 9.25112 0.857422 9.3154 0.857422 9.39397V10.394C0.857422 10.4725 0.921708 10.5368 1.00028 10.5368ZM15.0003 13.0368H1.00028C0.921708 13.0368 0.857422 13.1011 0.857422 13.1797V14.1797C0.857422 14.2583 0.921708 14.3225 1.00028 14.3225H15.0003C15.0789 14.3225 15.1431 14.2583 15.1431 14.1797V13.1797C15.1431 13.1011 15.0789 13.0368 15.0003 13.0368ZM15.0003 5.4654H1.00028C0.921708 5.4654 0.857422 5.52969 0.857422 5.60826V6.60826C0.857422 6.68683 0.921708 6.75112 1.00028 6.75112H15.0003C15.0789 6.75112 15.1431 6.68683 15.1431 6.60826V5.60826C15.1431 5.52969 15.0789 5.4654 15.0003 5.4654Z" fill="#1C1D1F"/>
</svg>`
const FormatAlignCenter = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M1.00028 2.9654H9.85742C9.936 2.9654 10.0003 2.90112 10.0003 2.82254V1.82254C10.0003 1.74397 9.936 1.67969 9.85742 1.67969H1.00028C0.921708 1.67969 0.857422 1.74397 0.857422 1.82254V2.82254C0.857422 2.90112 0.921708 2.9654 1.00028 2.9654ZM1.00028 10.5368H9.85742C9.936 10.5368 10.0003 10.4725 10.0003 10.394V9.39397C10.0003 9.3154 9.936 9.25112 9.85742 9.25112H1.00028C0.921708 9.25112 0.857422 9.3154 0.857422 9.39397V10.394C0.857422 10.4725 0.921708 10.5368 1.00028 10.5368ZM15.0003 13.0368H1.00028C0.921708 13.0368 0.857422 13.1011 0.857422 13.1797V14.1797C0.857422 14.2583 0.921708 14.3225 1.00028 14.3225H15.0003C15.0789 14.3225 15.1431 14.2583 15.1431 14.1797V13.1797C15.1431 13.1011 15.0789 13.0368 15.0003 13.0368ZM15.0003 5.4654H1.00028C0.921708 5.4654 0.857422 5.52969 0.857422 5.60826V6.60826C0.857422 6.68683 0.921708 6.75112 1.00028 6.75112H15.0003C15.0789 6.75112 15.1431 6.68683 15.1431 6.60826V5.60826C15.1431 5.52969 15.0789 5.4654 15.0003 5.4654Z" fill="#1C1D1F"/>
</svg>`
const FormatAlignRight = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M15.0003 1.67969H6.14314C6.06457 1.67969 6.00028 1.74397 6.00028 1.82254V2.82254C6.00028 2.90112 6.06457 2.9654 6.14314 2.9654H15.0003C15.0789 2.9654 15.1431 2.90112 15.1431 2.82254V1.82254C15.1431 1.74397 15.0789 1.67969 15.0003 1.67969ZM15.0003 9.25112H6.14314C6.06457 9.25112 6.00028 9.3154 6.00028 9.39397V10.394C6.00028 10.4725 6.06457 10.5368 6.14314 10.5368H15.0003C15.0789 10.5368 15.1431 10.4725 15.1431 10.394V9.39397C15.1431 9.3154 15.0789 9.25112 15.0003 9.25112ZM15.0003 13.0368H1.00028C0.921708 13.0368 0.857422 13.1011 0.857422 13.1797V14.1797C0.857422 14.2583 0.921708 14.3225 1.00028 14.3225H15.0003C15.0789 14.3225 15.1431 14.2583 15.1431 14.1797V13.1797C15.1431 13.1011 15.0789 13.0368 15.0003 13.0368ZM15.0003 5.4654H1.00028C0.921708 5.4654 0.857422 5.52969 0.857422 5.60826V6.60826C0.857422 6.68683 0.921708 6.75112 1.00028 6.75112H15.0003C15.0789 6.75112 15.1431 6.68683 15.1431 6.60826V5.60826C15.1431 5.52969 15.0789 5.4654 15.0003 5.4654Z" fill="#1C1D1F"/>
</svg>`
const FormatArrowUndo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g>
  <path d="M10.4 9.4C8.7 9.7 7.2 10.3 5.8 11.4L3 8.5V15.5H10L7.3 12.8C11 10.2 16.1 11 18.8 14.7C19 15 19.2 15.2 19.3 15.5L21.1 14.6C18.9 10.8 14.7 8.7 10.4 9.4Z" fill="black"/>
</g>
</svg>`
const FormatArrowRedo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g>
  <path d="M13.6 9.4C15.3 9.7 16.8 10.3 18.2 11.4L21 8.5V15.5H14L16.7 12.8C13 10.1 7.9 11 5.3 14.7C5.1 15 4.9 15.2 4.8 15.5L3 14.6C5.1 10.8 9.3 8.7 13.6 9.4Z" fill="black"/>
</g>
</svg>`
const FormatBold = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M10.1669 7.86927C10.4933 7.6705 10.7688 7.39822 10.9714 7.07413C11.1739 6.75004 11.298 6.38312 11.3336 6.0026C11.3398 5.65853 11.2781 5.3166 11.1521 4.99636C11.0261 4.67612 10.8383 4.38383 10.5993 4.1362C10.3604 3.88856 10.075 3.69043 9.75941 3.55312C9.44385 3.41581 9.10434 3.34201 8.76026 3.33594H4.43359V12.6693H9.10026C9.42769 12.6658 9.75124 12.5978 10.0524 12.4693C10.3536 12.3408 10.6265 12.1542 10.8555 11.9202C11.0846 11.6862 11.2653 11.4093 11.3874 11.1055C11.5094 10.8016 11.5704 10.4767 11.5669 10.1493V10.0693C11.5672 9.60735 11.4355 9.15495 11.1875 8.76524C10.9395 8.37553 10.5855 8.0647 10.1669 7.86927ZM5.76693 4.66927H8.56693C8.85104 4.66048 9.13105 4.73879 9.36938 4.89371C9.60771 5.04862 9.79295 5.27272 9.90026 5.53594C10.0088 5.8878 9.97372 6.26833 9.80258 6.59437C9.63144 6.92042 9.33819 7.16546 8.98693 7.27594C8.85051 7.31591 8.70908 7.33612 8.56693 7.33594H5.76693V4.66927ZM8.83359 11.3359H5.76693V8.66927H8.83359C9.11771 8.66048 9.39772 8.73879 9.63604 8.89371C9.87437 9.04862 10.0596 9.27272 10.1669 9.53594C10.2755 9.8878 10.2404 10.2683 10.0693 10.5944C9.89811 10.9204 9.60486 11.1655 9.25359 11.2759C9.11718 11.3159 8.97574 11.3361 8.83359 11.3359Z" fill="black"/>
</svg>`
const FormatItalic = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M7.83971 6.0026H9.17305L7.70638 12.6693H6.37305L7.83971 6.0026ZM8.95971 3.33594C8.82786 3.33594 8.69897 3.37504 8.58933 3.44829C8.4797 3.52155 8.39425 3.62566 8.34379 3.74748C8.29334 3.8693 8.28013 4.00334 8.30586 4.13266C8.33158 4.26199 8.39507 4.38077 8.48831 4.47401C8.58154 4.56724 8.70033 4.63074 8.82965 4.65646C8.95897 4.68218 9.09302 4.66898 9.21484 4.61852C9.33665 4.56807 9.44077 4.48262 9.51403 4.37298C9.58728 4.26335 9.62638 4.13446 9.62638 4.0026C9.62638 3.82579 9.55614 3.65622 9.43112 3.5312C9.30609 3.40618 9.13652 3.33594 8.95971 3.33594Z" fill="black"/>
</svg>`
const FormatStrikeThrough = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M2 8.13325H14V9.13325H11.0895C11.2474 9.46473 11.3271 9.82804 11.3224 10.1952C11.3318 10.5435 11.257 10.889 11.1045 11.2023C10.952 11.5156 10.7262 11.7875 10.4462 11.995C9.77194 12.4694 8.95851 12.7051 8.13501 12.6646C7.5333 12.6687 6.93746 12.5463 6.38611 12.3053C5.88258 12.0964 5.44612 11.7532 5.12435 11.3132C4.82808 10.8931 4.67175 10.3903 4.67757 9.87621V9.80062H4.86906V9.79989H5.09672V9.80062H6.01333V9.87618C6.00289 10.1104 6.04921 10.3438 6.14836 10.5563C6.2475 10.7688 6.39653 10.9541 6.58275 11.0966C7.03436 11.4182 7.58134 11.5778 8.13499 11.5495C8.62375 11.5814 9.10965 11.4536 9.51943 11.1854C9.67135 11.073 9.7934 10.9252 9.87491 10.7547C9.95642 10.5843 9.9949 10.3964 9.98697 10.2077C9.99759 10.0253 9.96391 9.84305 9.8888 9.67652C9.81368 9.51 9.69937 9.36413 9.55563 9.25139C9.49673 9.2087 9.43555 9.16926 9.37236 9.13322H2V8.13325ZM10.8965 4.7045C10.6155 4.26784 10.2181 3.91835 9.74907 3.69542C9.22624 3.44636 8.65285 3.32173 8.07381 3.33129C7.2664 3.29664 6.47255 3.54732 5.83146 4.03938C5.55623 4.25194 5.33423 4.52561 5.18299 4.83876C5.03174 5.1519 4.95542 5.49593 4.96004 5.84366C4.95771 6.17319 5.03106 6.49885 5.17444 6.79556H6.90556C6.84997 6.7598 6.78198 6.72505 6.7371 6.68847C6.60146 6.58841 6.49134 6.45775 6.41572 6.30711C6.34009 6.15648 6.30109 5.99012 6.30188 5.82156C6.29182 5.62916 6.32828 5.43716 6.40817 5.26184C6.48806 5.08651 6.60903 4.93302 6.76083 4.81436C7.14489 4.54801 7.60725 4.41832 8.07381 4.44608C8.5811 4.41383 9.08205 4.57289 9.47781 4.89188C9.64332 5.04774 9.77294 5.23774 9.85767 5.44871C9.9424 5.65968 9.98021 5.88655 9.96848 6.1136V6.1892H11.3039V6.1136C11.3062 5.61453 11.1647 5.12536 10.8965 4.7045Z" fill="black"/>
</svg>`
const FormatCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M14.6673 7.87345V8.12679C14.6658 8.25906 14.6132 8.38564 14.5207 8.48012L11.7607 11.2335C11.7297 11.2647 11.6928 11.2895 11.6522 11.3064C11.6116 11.3233 11.568 11.3321 11.524 11.3321C11.48 11.3321 11.4364 11.3233 11.3958 11.3064C11.3552 11.2895 11.3183 11.2647 11.2873 11.2335L10.814 10.7601C10.7829 10.7297 10.7583 10.6934 10.7414 10.6533C10.7246 10.6133 10.7159 10.5702 10.7159 10.5268C10.7159 10.4833 10.7246 10.4403 10.7414 10.4002C10.7583 10.3602 10.7829 10.3239 10.814 10.2935L13.114 8.00012L10.814 5.70679C10.7827 5.6758 10.7579 5.63893 10.741 5.59831C10.7241 5.55769 10.7154 5.51412 10.7154 5.47012C10.7154 5.42612 10.7241 5.38255 10.741 5.34193C10.7579 5.30131 10.7827 5.26444 10.814 5.23345L11.2873 4.76679C11.3183 4.73554 11.3552 4.71075 11.3958 4.69382C11.4364 4.6769 11.48 4.66819 11.524 4.66819C11.568 4.66819 11.6116 4.6769 11.6522 4.69382C11.6928 4.71075 11.7297 4.73554 11.7607 4.76679L14.5207 7.52012C14.6144 7.6138 14.6672 7.74089 14.6673 7.87345ZM2.88732 8.00012L5.18065 5.70679C5.21169 5.67637 5.23636 5.64007 5.25319 5.6C5.27003 5.55994 5.2787 5.51691 5.2787 5.47345C5.2787 5.42999 5.27003 5.38697 5.25319 5.34691C5.23636 5.30684 5.21169 5.27054 5.18065 5.24012L4.70732 4.76679C4.67633 4.73554 4.63946 4.71075 4.59884 4.69382C4.55822 4.6769 4.51466 4.66819 4.47065 4.66819C4.42665 4.66819 4.38308 4.6769 4.34246 4.69382C4.30184 4.71075 4.26497 4.73554 4.23398 4.76679L1.48065 7.52012C1.38806 7.6146 1.33552 7.74118 1.33398 7.87345V8.12679C1.3341 8.25935 1.38686 8.38644 1.48065 8.48012L4.24065 11.2335C4.27164 11.2647 4.30851 11.2895 4.34913 11.3064C4.38975 11.3233 4.43331 11.3321 4.47732 11.3321C4.52132 11.3321 4.56489 11.3233 4.60551 11.3064C4.64613 11.2895 4.683 11.2647 4.71398 11.2335L5.18732 10.7668C5.21856 10.7358 5.24336 10.6989 5.26028 10.6583C5.2772 10.6177 5.28592 10.5741 5.28592 10.5301C5.28592 10.4861 5.2772 10.4425 5.26028 10.4019C5.24336 10.3613 5.21856 10.3244 5.18732 10.2935L2.88732 8.00012ZM10.2207 2.91345L9.57398 2.66679C9.48988 2.63828 9.39805 2.64313 9.31742 2.68035C9.23679 2.71756 9.17352 2.78429 9.14065 2.86679L5.60065 12.6668C5.57063 12.7499 5.57483 12.8415 5.61234 12.9215C5.64984 13.0015 5.71757 13.0634 5.80065 13.0935L6.42732 13.3201C6.5105 13.3484 6.60138 13.3433 6.68092 13.306C6.76046 13.2687 6.82248 13.2021 6.85398 13.1201L10.394 3.33345C10.422 3.25119 10.4167 3.16125 10.3794 3.0828C10.342 3.00435 10.2755 2.94358 10.194 2.91345H10.2207Z" fill="#1C1D1F"/>
</svg>`
const FormatFileImage = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<g clip-path="url(#clip0_1379_152965)">
  <path d="M8.73449 7.94821L7.3452 9.71964L6.61127 8.78393C6.59791 8.76686 6.58084 8.75305 6.56134 8.74355C6.54185 8.73405 6.52045 8.72912 6.49877 8.72912C6.47709 8.72912 6.45569 8.73405 6.4362 8.74355C6.41671 8.75305 6.39964 8.76686 6.38627 8.78393L4.60413 11.0554C4.58764 11.0764 4.57741 11.1017 4.57461 11.1283C4.57181 11.1549 4.57654 11.1817 4.58828 11.2057C4.60001 11.2298 4.61827 11.25 4.64097 11.2642C4.66367 11.2783 4.68989 11.2858 4.71663 11.2857H11.2863C11.4059 11.2857 11.472 11.1482 11.3988 11.0554L8.96127 7.94821C8.94773 7.93111 8.9305 7.9173 8.91086 7.9078C8.89122 7.8983 8.86969 7.89337 8.84788 7.89337C8.82607 7.89337 8.80454 7.8983 8.7849 7.9078C8.76526 7.9173 8.74803 7.93111 8.73449 7.94821ZM5.28627 6.75C5.28627 6.93944 5.36153 7.12112 5.49548 7.25508C5.62944 7.38903 5.81112 7.46429 6.00056 7.46429C6.19 7.46429 6.37168 7.38903 6.50563 7.25508C6.63959 7.12112 6.71484 6.93944 6.71484 6.75C6.71484 6.56056 6.63959 6.37888 6.50563 6.24492C6.37168 6.11097 6.19 6.03571 6.00056 6.03571C5.81112 6.03571 5.62944 6.11097 5.49548 6.24492C5.36153 6.37888 5.28627 6.56056 5.28627 6.75ZM14.1184 4.01071L10.2756 0.167857C10.1684 0.0607143 10.0238 0 9.87199 0H2.28627C1.9702 0 1.71484 0.255357 1.71484 0.571429V15.4286C1.71484 15.7446 1.9702 16 2.28627 16H13.7148C14.0309 16 14.2863 15.7446 14.2863 15.4286V4.41607C14.2863 4.26429 14.2256 4.11786 14.1184 4.01071ZM12.9684 4.67857H9.6077V1.31786L12.9684 4.67857ZM13.0006 14.7143H3.00056V1.28571H8.39342V5.14286C8.39342 5.34177 8.47243 5.53254 8.61309 5.67319C8.75374 5.81384 8.9445 5.89286 9.14342 5.89286H13.0006V14.7143Z" fill="#1C1D1F"/>
</g>
<defs>
  <clipPath id="clip0_1379_152965">
    <rect width="16" height="16" fill="white"/>
  </clipPath>
</defs>
</svg>`
const FormatLink = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M9.10776 10.7379C9.08091 10.7114 9.04465 10.6964 9.00686 10.6964C8.96908 10.6964 8.93282 10.7114 8.90597 10.7379L6.83097 12.8129C5.87026 13.7737 4.24883 13.8754 3.18811 12.8129C2.12561 11.7504 2.2274 10.1308 3.18811 9.17009L5.26311 7.09509C5.31847 7.03973 5.31847 6.94866 5.26311 6.8933L4.5524 6.18259C4.52555 6.156 4.48929 6.14109 4.45151 6.14109C4.41372 6.14109 4.37746 6.156 4.35061 6.18259L2.27561 8.25759C0.7649 9.7683 0.7649 12.2129 2.27561 13.7219C3.78633 15.2308 6.23097 15.2326 7.7399 13.7219L9.8149 11.6469C9.87026 11.5915 9.87026 11.5004 9.8149 11.4451L9.10776 10.7379ZM13.7256 2.27366C12.2149 0.762946 9.77026 0.762946 8.26133 2.27366L6.18454 4.34866C6.15796 4.37551 6.14304 4.41177 6.14304 4.44955C6.14304 4.48734 6.15796 4.5236 6.18454 4.55045L6.89347 5.25938C6.94883 5.31473 7.0399 5.31473 7.09526 5.25938L9.17026 3.18438C10.131 2.22366 11.7524 2.12188 12.8131 3.18438C13.8756 4.24688 13.7738 5.86652 12.8131 6.82723L10.7381 8.90223C10.7115 8.92908 10.6966 8.96534 10.6966 9.00313C10.6966 9.04091 10.7115 9.07717 10.7381 9.10402L11.4488 9.81473C11.5042 9.87009 11.5953 9.87009 11.6506 9.81473L13.7256 7.73973C15.2345 6.22902 15.2345 3.78438 13.7256 2.27366ZM9.7524 5.50402C9.72555 5.47743 9.68929 5.46252 9.65151 5.46252C9.61372 5.46252 9.57746 5.47743 9.55061 5.50402L5.50597 9.54688C5.47938 9.57373 5.46447 9.60998 5.46447 9.64777C5.46447 9.68555 5.47938 9.72181 5.50597 9.74866L6.21311 10.4558C6.26847 10.5112 6.35954 10.5112 6.4149 10.4558L10.4578 6.41295C10.5131 6.35759 10.5131 6.26652 10.4578 6.21116L9.7524 5.50402Z" fill="#1C1D1F"/>
</svg>`
const FormatListOutline = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M5 4.5H14" stroke="#1C1D1F" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
<path d="M5 8H14" stroke="#1C1D1F" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
<path d="M5 11.5H14" stroke="#1C1D1F" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
<path d="M2.5 5C2.77614 5 3 4.77614 3 4.5C3 4.22386 2.77614 4 2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5Z" stroke="#1C1D1F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 8.5C2.77614 8.5 3 8.27614 3 8C3 7.72386 2.77614 7.5 2.5 7.5C2.22386 7.5 2 7.72386 2 8C2 8.27614 2.22386 8.5 2.5 8.5Z" stroke="#1C1D1F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 12C2.77614 12 3 11.7761 3 11.5C3 11.2239 2.77614 11 2.5 11C2.22386 11 2 11.2239 2 11.5C2 11.7761 2.22386 12 2.5 12Z" stroke="#1C1D1F" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const FormatUnderline = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M12.6673 13.3359V14.6693H3.33398V13.3359H12.6673ZM10.6673 8.8126C10.6454 9.25259 10.5148 9.68029 10.2871 10.0575C10.0595 10.4347 9.74203 10.7496 9.363 10.9741C8.98397 11.1986 8.55521 11.3257 8.11506 11.3441C7.6749 11.3624 7.23706 11.2715 6.84065 11.0793C6.38374 10.8816 5.99626 10.552 5.72783 10.1328C5.4594 9.71349 5.32227 9.22363 5.33398 8.72594V3.33927H4.00065V8.8126C4.02321 9.44021 4.19322 10.0537 4.49693 10.6034C4.80064 11.1531 5.22951 11.6235 5.74883 11.9767C6.26815 12.3298 6.86332 12.5557 7.48617 12.6361C8.10901 12.7164 8.74203 12.649 9.33398 12.4393C10.1214 12.1768 10.8046 11.67 11.2841 10.9926C11.7637 10.3152 12.0147 9.50248 12.0007 8.6726V3.33927H10.6673V8.8126ZM10.6673 3.33594H12.0007H10.6673ZM5.33398 3.33594H4.00065H5.33398Z" fill="black"/>
</svg>`

export const ICONS_EDITOR = {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatArrowUndo,
  FormatArrowRedo,
  FormatBold,
  FormatItalic,
  FormatStrikeThrough,
  FormatCode,
  FormatFileImage,
  FormatLink,
  FormatListOutline,
  FormatUnderline,
}
