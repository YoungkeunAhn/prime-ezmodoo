import React from 'react'
import { IconProps } from 'src/types/icon'

function CogChatIcon(props: IconProps) {
    const { className, width, height } = props
    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width={width ?? 20}
            height={height ?? 20}
            className={className || 'fill-[#BFC3CB]'}
            viewBox="0 0 539.8 420.1"
            enable-background="new 0 0 539.8 420.1"
            xmlSpace="preserve"
        >
            <path
                d="M-1667.2-174.4c-37.3,0-74.6,0-112,0c-13.5,0-23-5.9-27.5-17.5c-1.3-3.5-1.7-7.5-1.7-11.2c-0.1-43.8,0.2-87.6-0.2-131.5
	c-0.2-16,11.7-28.9,28.9-28.6c13.5,0.2,27-0.1,40.5,0.1c3.3,0,5.1-0.8,6.4-3.9c2-4.7,4.6-9.2,6.9-13.8c4.2-8.3,11.1-13.1,20.2-13.2
	c25.8-0.3,51.6-0.3,77.5,0c8.9,0.1,15.1,5.2,19.1,13.1c3.1,5.9,5.3,13.4,10.2,16.8c4.3,2.9,11.9,1,18,1c8.7,0.1,17.3,0,26,0
	c18.5,0.1,29.4,11.1,29.4,29.7c0.1,17.7,0,35.3,0,53c0,25.7,0,51.3,0,77c0,13.8-6.8,24-18.6,27.6c-3.6,1.1-7.5,1.5-11.3,1.5
	C-1592.5-174.4-1629.9-174.4-1667.2-174.4z M-1615.9-271.7c0.2-26.1-24.9-52.5-58.7-47.9c-24.2,3.3-45.4,25.2-43.6,54.3
	c1.7,27.3,25.5,51.8,59.7,47.1C-1635.6-221.4-1613.6-243-1615.9-271.7z"
            />
            <path
                d="M-1352.1-550.4c0.1-1.8,0.3-3.1,0.3-4.4c0-14,0-27.9,0-42.9c-37,5.9-73.4,11.8-110.5,17.7c0,2.2,0,4.1,0,6.1
	c0,30.8-0.8,61.7,0.2,92.5c1,30.3-18.5,45.2-41.2,51.9c-18.3,5.4-36.9,4.5-54.6-3.6c-12.3-5.7-22.5-13.9-27.7-27.2
	c-5.2-13.4-1.1-30.9,9.4-40.8c17.9-16.8,39.2-21.3,62.8-18.1c1.1,0.2,2.3,0.1,4.1,0.3c0-2.2,0-4.1,0-6c0-31.8,0-63.6,0-95.5
	c0-21.4,10.4-32.7,31.5-35.8c28.6-4.1,57.1-8.9,85.7-13.3c17.7-2.8,35.4-5.7,53.2-8.3c16.5-2.5,31.5,9.4,33.4,26.1
	c0.4,3.3,0.4,6.7,0.4,10c0,42.7-0.9,85.3,0.3,127.9c0.8,28-13.6,43.7-37.8,51.7c-23.4,7.7-46.3,5.9-67.4-7.9
	c-15.8-10.2-22.9-26-19.5-43.1c2.3-11.2,9.2-19.5,18.3-25.8c17.1-11.9,36.2-15,56.6-11.6C-1353.9-550.6-1353.3-550.6-1352.1-550.4z"
            />
            <path
                d="M-1682.8-646.3c5.9-5.5,11.4-11.5,17.8-16.5c23.5-18.6,59-21.2,84.8,1.3c26.9,23.4,29.7,62.2,12.7,89.3
	c-5.4,8.6-13,16-20.2,23.4c-27.5,28.3-55.3,56.4-83,84.5c-8.3,8.4-15.9,8.4-24.1,0c-31-31.6-62.1-63.2-93-95
	c-21.9-22.5-27.4-55.2-12.6-82.9c15.7-29.2,47.6-43.3,81.2-31.2c13.9,5,24.6,14.2,34.1,25.1c0.5,0.6,1.1,1.2,1.7,1.8
	C-1683.2-646.4-1683-646.4-1682.8-646.3z"
            />
            <path
                d="M-1376.6-331.5c6.3,0,11.8,0,17.3,0c12.7,0,25.3,0,38,0c2.2,0,4.3,0.1,6.5,0.2c7.7,0.3,12.4,9,7.9,15.5
	c-10.3,14.7-19.9,29.9-29.8,44.9c-19.5,29.6-39.1,59.1-58.6,88.6c-4.4,6.7-9.7,8.8-17,6.8c-5.7-1.5-8.6-6-7-11.7
	c5.4-19.4,11-38.6,16.5-58c2.2-7.8,4.5-15.6,6.9-24.1c-2.4,0-4.2,0-5.9,0c-17.3,0-34.7,0.1-52-0.1c-3.4,0-7-0.4-10.2-1.6
	c-4.6-1.7-6.4-5.6-5.7-10.5c5.1-32,10.2-64,15.3-96c0.4-2.8,0.7-5.6,1.4-8.4c1.4-6,3.7-8,9.9-8.6c2-0.2,4-0.2,6-0.2
	c21.8,0,43.6,0,65.5,0c1.8,0,3.7,0,5.5,0.1c9.8,0.7,13.5,6.8,9.7,15.7c-5.8,13.4-11.6,26.8-17.4,40.2
	C-1374.7-336.5-1375.5-334.5-1376.6-331.5z"
            />
            <image
                overflow="visible"
                width="628"
                height="485"
                xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/7AARRHVja3kAAQAEAAAAHgAA/+4AIUFkb2JlAGTAAAAAAQMA
EAMCAwYAAA2RAAAWHwAAKSb/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoX
Hh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoa
JjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAeYCdAMBIgACEQEDEQH/
xADAAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUBAgEBAQEBAQAAAAAAAAAAAAAAAAMCAQQQAAEDAwIF
BAICAwEBAAAAAAECBAUAAwYgMBBAETE1UDITFTQHEjNgIRYUgBEAAgEBBAMNBgUDBAIDAAAAAQID
BAARITEwUWEgQFBBsdESMkITczQFcSJykrIjoVLCM4ORwRQQgWIkYKKA4UMSAAEDBAICAgMBAAAA
AAAAAAEAIBEQMCExQGFxgVCRYEECUf/aAAwDAQACEQMRAAAAsAAAAAAAAAAAAAAAAAAwmZyfO867
X2OdAAAAAANfm952nEHbcQdtxB23L6fO+gAAAAAAAAAAAAAAAAAAAAAAAAaPOrveO7H8a0w7z770
ec7bm9TliRp3xjYAADFl5vVZ6Z6YA4AB7PIFI86sceewAAAAAAAAAAAAAAAAAAAAAAxn3D+bGKz+
vkrMAAB9fInMwpeTSpYbHklQABzOnzO8qgemAAACRxyR51Y489gAAAAAAAAAAAAAAAAAAAAByOty
t9TTtIN4AAAAAA7Fj1BuY3bzk9aNQ4czp8zvKoHpgAAAkcckedWOPPYAAAAAAAAAAAAAAAAAAAA+
YT3nTr748vINZAAAAAAAAyWBXfudXSg82hX65nT5hVA9MAAAEjjkjzqxx57AAAAAAAAAAAAAAAAA
AAMOtW2870fLSDvAAAD6nHOxf6tVKlL+WJX9MYxrIAACQx5ztyaVdzaNK2F5AAAJHHJHnVjjz2AA
AAAAAAAAAAAAAAAHh7w+fBKYy65aQAAADNtWRnWl3yFQ51yOu6qHTt6t7S5I3gAAB9/AAAAASOOS
POrHHnsAAAAAAAAAAAAAAAANYzQPn8S0vfCmAAAB6edzozqdMWwRoAaXx3nQee86x5BXUaumG1nC
HvlZgAAAAAAJHHJHnVjjz2AAAAAAAAAAAAAAAEd7zfrbXw3kGsgAADZMM86HbjXz0nsYjJC+bHLT
+vPFJyueUx257s9rbMagR2vbk5dMVS3tG0wcAAAAASOOSPOrHHnsAAAAAAAAAAAAAA8x19rnThPi
8Q7wAAASDndKyNnNGoY0OP1t1vqatpBvAAG/ZFUZs6uRHpDCoc7rVxaHxrNMJVFbyDvAAAAEjjkj
zqxx57AAAAAAAAAAAAANPTrfedzkl5A4AAA9+5/nXNm/0hUOdPmEd50oB8eXkGsgAAAezeDudun2
u7AhbIM98iUud5S/zZld3lrjWQAAHQ5523tyobGhXsDGgAAAAAAAAAB8n1F+ZEaz+vgrMAAABt7d
kY3qdcjUOGDXrbed3gFpB3gAAAAADscc7b+3UNkQr1hjTn9AVNzrjrq8uCN4AAAZMYsGU0tLZUnj
4+5UAAAAAAAAHONqutLnXkG8AAAD08knSmcqY8pKg8PeHz4JTGXXLSAAAAAAAAAZMYsWS0tM5Umz
z2VHz9CCRG6IvWdfPv4rMAAADuWLT29jduOX1IVAAAAAAPIj3nRrvD83kGsgAADed1rD3upGgT2N
cywTn8O0/fCkwAAAAAAAAAAAJFYVN9Se7WaW7GoHFrm4NHeajdTl3kDgAAGWwa59zq6UImsK/Q50
AAB8/XA7yOxY9EQ7wAAASnndCxs/3CoZ0OB3m7W2vgvINZAAAAAAAAAAAAAA2rHq77zq50WlMKhz
uGvbI81ylk0hl4+DvAAAEgj7nblyxOWeewc6AA5fUFL/ADPIH6YB3gAD6y2LnXOl3qFQ5158QHXO
lB/leId4AAAAAAAAAAAAAAAB7Log526Pqs7FhXOM6RqSu8prFalb3lpjWQAHvkv53ud889g50AAD
yvrCx65TLr8j0RBx0N2xcb1uiQqA1dSt952+OXkDgAAAAAAAAAAAAAAAAADo847bXQp2xYU7oxtq
bYqzkXNALSjApgbzu/ZeHY89QzoAAAADTq63cO805LZX0e8+fonsBwe9A9Zi2I9EQAAAAAAAAAAA
AAAAAAAAAH38CwZTW1kwsGNPPRDYTdGjTFVWft7POhjQAAAAAAAAACBzyB7zEReIAAAAAAAAAAAA
AAAAAAAAAEhsmtrJhUMbAAAAAAAAAAAAAAQOeQPeYiLxAAAAAAAAAAAAAAAAAAAAAAkNk1tZMKhj
YAAAAAAAAAAAAACBzyB7zEReIAAAAAAA6TvNWhuT1Ua3DtRrcFRrcFRrc1yq3Z41MA4AAAAAABIb
JrayYVDGwAAAAAAAAAAAAAEDnkD3mIi8QAAAAAAFm1lbM99ERqAAABz6luambTCkwAAAAAAJDZNb
WTCoY2AAAAAAAAAAAAAAgc8ge8xEXiAAAAAAAtmprZnToiNAAAAMdM3NTNZhWYAAAAAAEhsmtrJh
UMbAAAAAAAAAAAAAAQOeQPeYiLxAAAAAAAWzU1szp0RGgAAAGOmbmpmswrMAAAAAACQ2TW1kwqGN
gAAAAAAAAAAAAAIHPIHvMRF4gAAAAAALZqa2Z06IjQAAADHTNzUzWYVmAAAAAABIbJrayYVDGwAA
AAAAAAAAAAAEDnkD3mIi8QAAAAAAFs1NbM6dERoAAABjpm5qZrMKzAAAAAAAkNk1tZMKhjYAAAAA
AAAAAAAACBzyB7zEReIAAAAAAC2amtmdOiI0AAAAx0zc1M1mFZgAAAAAASGya2smFQxsAAAAAAAA
AAAAABA55D95govEAAAAAABbNVXBOmYRoAAABjpm6ahrPUFZgAAAAAASGyYFPYWDGgAAAAAAAAAA
AAAGLKK75FtqYqNbgqNbgqNbgqNbgqNbgqNbgqPNawjkjMaDnQAAAHF7Tqq9e3G8VGtwVGtwVGtw
VGtwVGtwVGtwVH07JGrtE9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9oACAECAAEFAOS/idgAmv4qr+Kq/iqiCOaRb60A
BwIBpaOmkd9Cx1TzCLepdvQO+hft5YAmkIA2FoBogjgO+hft5VKSSlITtKSFUpJBHfQv28olBVQA
A0KUAPlNJUFaSAQUFJ0L9vJot9dSlhNEkmgSKQsHaX7eSRb6al3OnHoeKLmyv28gASUoCdS7nXii
3wXb68UL6V31r9u+lJVSUgDQSAFLKuABNIQBoUgKogg0lZTQII0r9u8hBNAAaVKCaUok0lJJSkJ1
KSCFJKeAUQUqCtJHWloI3UW9S1gUSTwSgqoAAayAaWgjgD0pC+updvaA60hHTUu5xRb67i7fFFzU
tANEdNYSSUpCdPalr68UW+m8tHXihfSgeulSQqlJIOgDqQABoJACllXAAkpQE8gpAVRBBpKimkqB
GggEKHQ8QehSoEcVKCaKiTSUlVJSAORKQQpJTwBIKVhWhRABPU6Eq/iQeopa+lE9eCEE0AByhHWl
o6cUXOvA/wCqUr+R1IX/ABpVzrxQAVcvcACuCbnSlr/luW/dy933b9v3cvd92/b92wT0r5RXyivl
FfKK+UUCCNi77t+37ti7202u2xd92/b92xd7abWzd92/b92xd7abWzd92/b92xd7abWzd92/b92x
d7abWzd92/b92xd7abWzd92/b92xd7abWzc93IC6a+U18pr5TXymvlNfKa+U0SSdIJB+U18pr5TX
ymvlNfKa+U0bp/xv/9oACAEDAAEFAOS6jY6iuorqK6iuvNKX0okngCRSV9dJ7aEn/fMKXqSvQe2h
PflielKV12Eq6UD14HtoT35UkCionaCiKBBo9tCe/KKUBRJOkAmvjFFJGkEigoEaE9+TUvpqSkmg
AOBHWlJ6bSe/JKX11JRx6jipGynvyBIFKUTqSjpxUvglfTipHXYT33yoCiSdIBNJSBwJ6UpXXQlR
FAg8FJBogjUnvvKV0onrpCSaAA4EgUVE6gSKCgeBANKSRqSrruqXqSnrQHTgpQFEk7APSkq68VI6
akr21L66ko4qX03Er4qRqSvpQPXWSBSlE6ko6cVL67yV9OKk9aI6aQoigQdJPQEk6QCaSkDgSBSl
E8glRFAg8FJBogjSCRQPUcT/ALojoeKUk0ABwKgKJJ5IEikqB4EA0pJGgDqQOg0KHUEdOCUdeKld
KJ68qlfXipHTilPQalJ60EcVHoOXQeo4KR1pKem4v28ujtvr9vLo7b6/bs/Ga+M18Zr4zXxmiOmy
jtvr9uxb76bmyjtvr9uxb76bmyjtvr9uxb76bmyjtvr9uxb76bmyjtvr9uxb76bmyjtvr9uxb76b
myjtvr9uxb1XNlHbkCgV8Yr4xXxivjFfGK+MV8YoADUR1r4xXxivjFfGK+MV8Yr4xXxj/G//2gAI
AQEAAQUA/wAyvu2rcXMogUC3lUCst37J0nddvmjG2cugQf8Ar4Gv+vga/wCvga/6+Br/AK+Br/r4
Gm2SQrpfqcnLsYuzK5rIvKu3r148Ldy5bVF5lKMai5hjK2dpzfQ2byko6lHWxg81edo9RyLKW8Uh
28cvb+po7cMr+PZS2lU7OR+C2cEJE76eSAMkzFNqlrXcXsJUpCsbzJN2gQRryPwWzgvnfTr1+03t
ZHl15+dzHMvvMKs37Li1qyPwWzgvnfTZGTZxjedyJ3MXd6CyJ3D3Y2TaSbbTkfgtnBfO+mTuQs4e
1JSjyTcchGSjyLcQWQtJizoyPwWzgvnfS8iy6zHC/fvOLvJWHF5tdx3LrMgOOR+C2cF876SpSUJy
TMiuiSTygJBxvMSikqSpNZH4LZwXzvpDp23Z2MiypxKq22mPzDxLrGppokgg7WO5U4i1NXbd5YyP
wWzgvnfR5aYZRLeZnXkxf2kpUtWN4cmzQAArI8RsyAv2Lza7tQs68h772YZy2NbOC+d9GyDJ2sQh
8/dSDjaaNHD2/j2LNopOiex1pMWZKMdxjnat3rtrawXzvouR5jba1cuXLtzaiIZ5LuIaDZxFjVJR
jSTbzuPO4e7yeC+d9DuXbdq3keYXHe5j+MOpdbJi1YN9i/YsubWR4lejjyWC+d9Cfv2se2n8mdS9
zbxvD1uat27dpGh1MxbNTWdiHatBAIyPDQulJUhXIYL530GanmcPZlZd7LONq3buXbmN4fbajQSE
jJMypSlLUCQcczC40q1dt3rejIsVsSaXTW+zv7+C+d9AyLK7EWHLpw7vbTFg6kHGP4y1iLehw4sN
bORZZfkjogMldQ9xi/ayDfRNwLOYsysQ8inG9gvneeJCRkmZBNKUpStqGgnsxfiodlEt9EnKs4tv
N5A8mL2qJmHkS5hZ1nMWND+PaSLefxt3D3N3BfO864cWGtnI8tvyJ28exVxKqatG7OxonsjaQ9qR
knck42Grtwzv47lViUTou2rd63keIXGW7gvneck5VnFt5zIHkxe2gCTjeHG5SUpQnRkeX2mFXr12
/d2kqUhWN5iLlAgjj3rJMOQ4q5bXaXtQcqqJkI2TaSbbmp7I2kPakZJ3JONqzZuuLuOYjZYDQpSU
JyTMTdokk7uOZdej6sX7Li1oyDF2ssh6ydMb+1GybuMcQWRNJi1zGR5fZYi9eu37m1HRjyTcQWOt
Ie1odu27KxkWUuJVfIQORO4e7GybSTbaJeFZS7eYhXkQ42rF+63u45l9p6OVWtFtGSZiq9RJJ2oP
HnkxdjItnFttEtMM4lvMzjyYv8lGSjyLcQeQtJizoeM2z6xkOLuYle12rHMxW3q3cRdRyTx62Yt8
hylzLL28cxK9Ilu3strOjIMmaxCHz91IOOUsOLza7jmW2JEaFoRcRkmHKsUQQdqAyd1ELYv2sg35
CYmmcQ3mJt5L39oAqON4aE0AEjRkmYIa1cuXLtzlgSDjeZfxCVJUNGR4hae1dtXbNzaipd5FOIWf
ZTFneyHKG0Sl69cvnG02a33d7HcUbxg0XLlu1byTMFuq781juV34xTZzYd2NE/jbWYtv491HONps
5vtL2PZbYkht9qyPMkWKWtdxe1FRDyVcQkCzh7Gh8+asG+QZM6l185CT7yHvRcszlW+iUiWcq3mo
F5D3toEg45mRTSVJWnYUpKE5Jl114rbgMbdzFyPjmka20TM4zh7EtMvJZxz0fIu45xA5I0mLehy1
sO7GRYpfizt49lTmKU3cWnNjXmru42g9vG8QuPTas2rFvRkWUt4pDt45e3/QLV67YuY5l9p6NCkp
UnJMNIJBB2v1+7XdYa8ii1SsVctrtL2EIXcXjeHJsV20EgDJMxTaC1ruL9CBION5iqzSFouI0ZHi
VmRDhvfbXdjvWHxFyNjdjMcb/wDQnWzZOXzjHsXbRKNF69asWsjy+6/9Hx7KHMUtm8bPbGicx5nM
WZOLeRbjXhuN/OvZ71l+Of8Ahu6YeFeS7iHhGcRY0SEk0jW89kbuYuekQ828iL8RMspexokYxpJt
53HXcPd04xjy5dyhCLaNq9ZtOLWRQV2HeccfxhzLrZMmrCxonJ9nD2ZSVeSrj0pk+csHGP5O2lka
L9iy4tZHiN5geMPFOJZ6xYt49ruSkY3lGcpFPIpyAScbw5bikIRbRoyjI/prThzfdXvTLdy5aXim
UXJFWggEZJhqV0tCkKZs3L5xAQtmHZbzhq2dIbwEO2uav2H+Z6dg3ntTuGi3qmkcxYjl/wBh/men
YN57n/2H+Z6dg3nuf/Yf5np2Dee5/wDYf5np2Dee5/8AYf5np2Dee5/9h/mcjCQjmZdMsShGiPpo
qvpoqvpoqvpoqvpoqvpoqvpoqvpoqnWLwjlGQ47fhrvI4N57n/2H+ZyOHM0NYLanWSH0TyODee5/
9h/mcjj/AIPav/08jg3nuf8A2H+ZyOP+D2r/APTyODee5/8AYf5nI4/4Pav/ANPI4N57n/2H+ZyO
P+D2r/8ATyODee5/9h/mcjj/AIPav/08jg3nuf8A2H+ZyOP+D2r/APTyODee5/8AYf5nI4/4Pav/
ANPI4N57n/2H+ZyOP+D2r/8ATyODee5/9h/mcjj/AIPav/08jg3nuf8A2H+ZyOP+D2r/APTyODee
5/8AYf5nI4/4Pav/ANPI4N57n/2H+ZyOP+E2r39PI4N57n/2CzWtvyFizdcXmjcNWm0R1EoxuR8h
yH6/ZLW959y3surEthMg2uKg5dB+lla+lla+lla+lla+lla+lla+lla+lla+lla+lla+lla+lla+
llab43NOF41iqIo7mRY5YmbTvF5tqv6WVr6WVr6WVr6WVr6WVr6WVr6WVr6WVr6WVr6WVr6WVr6W
Vr6WVoQssTGYZKvLkdHto1p/8nf/2gAIAQICBj8A4WjYwForRWis8qTpYFMqRpoaeTJ+nSPpg8tP
jjwFJ3YkbUGg8tPjjYuZQ8tPji9KA3K06Ch/ktPjiSXdqTSQoO7R8cOS6BXVYP3ZPjgwF26BWT9U
kVg6sHxwcNkrqkBT+2dqDTpSHHxfk6UB2aYWHZrIdCkauz/X06BtSadKBYgqRqmFB26f5+rWFJ26
B91k3JH1WP6+3SNqC+A+Bqsm9I3WDpSHZaAoDZK6pAXfA7UGshsFEMlS2TTCxwoNZC7ZJUtlSKQN
rNJ/SgcTKkarB3a6UDFQDyMVg5Ufq4OR64A5HrgCzJWlpaWlpSLPrgCyPLjZ9cAWR5cbPrgCyPLj
Z9cAWR5cbPrgCyPLjZ9cAWR5cbPrgCyHHlf6tLS0tLS0tKS6QtLS0tLS0tLX43//2gAIAQMCBj8A
4W7G1tbW+XAWaYUG0OTAdBYWjkdWOqlo42bmEWji9rLtuwi0cSA7pYr1aHDgOkukWRwcvk1gUg1k
WBwctwzpuK5cL/b8WcVy/u7Ad1XtZs91kadBtwNOk1gXINZDs6sZfJrAvQa42/DZWW4rldcHFctw
ptY4uK5bCixJ1XvjQd1kW88vNcfk+1tbW1v4kfBFw+CLh8EXD4IuHwRcOSbJcOXtbW1tbW1tQH7W
1tbW1tb/ABz/2gAIAQEBBj8A/wDMr55UjH/JgLecRruJbza7/LVb/wA14sGp50kBy6LC/wDppu9q
5VhQ5Fjn7LXf5N+0A28x+Bt5j8DbzH4G3mPwNvMfgbeY/A2EcVUnTbAK3u3/ANeFO9q5ApPVjGLM
dgs0dJ/1YThhi5B1m3SldnOtiTy/6ho2KMMipIP4WVJz/lQDsv1gNjWEtLICbvejODr7Ro5aiTqQ
o0jexR0jZqmpa+8+4nZReIAaGX06pYu8K95E5xJS+5gfYSOEjBARNWnALmI9rc1mqKmQySucSeQb
taimcxyLkR/eywT3Q1v5Oy93GvNoq7wW5NF7YXv/AKrwhecAMzZ6L0tr5MVkqBkuxNu2xdyWdjez
HEknQh0JVlN4YYEGy0fqjXSZJUHI7G22vGIOR0Fd4LaL+F/08HtNM4jjQXszG4CzUlCTFR5M+TSc
w0q0leTLS4BXzaMf3FlmgcSRuL1ZTeCN3XeC2i/hf9PBxqKt+gowUdpjqUWub7dKp+3CDhsLazpw
Ae8pWI7yE6ta6jZailcMp6y9pTqYbqu8FtF/C/6eDT0yJKlh9uAHH2tqFjUVTlmPVXsqNSjeIqKV
+icOkvZYaiLDofbqVF8kJ18ZXWNzXeC2i/hf9PBjUtERLWYhmzWP26zZpp3Mkrm9nY3k7zWaBzHI
hvVlNxsKWuIiq+y2SSezUdxXeC2i/hf9PBRdyFVReWOAAs9F6W1y4rJUDM8Vyc9iSbycSTvW8G4j
Iiy0fqr3rklScxqD2DKQysLwRiCD/pXeC2i/hf8ATwS1RUuI4kF5Y/2s1PT3xUQPV7Um1tmzSB4K
ZyhyYjoj8bF5aViii8snvAf0tccCMxoxT1JM1GeI9ZNq7NllqKZxJE4vBH97V3gtov4X/TwR31U2
J6kY6znYLdOc9GJf24V6qj+50YRAWZjcFGJJstZ6ovSlGMdOcQu19uy1wwAyH+jVVCBFV5suSye3
UbNDOhjkQ3MrC44aMPC3ShYgywnqt/8Adq2amb3hC3TjPWQ7dF/C/wCngcxJdNWEe7EDgt/G9mqK
pzJI39ANQHENGtPTIZJXNwUcpsJ5rpq0jFz1U2Jz7m9h3dUgPdTDkbWLNT1SFSOq3Zca1OjYRuVD
qVcA5qcCDov4X/TwM1H6awknxDzDFU+HWbNJKxd3N7MTeSdGIqZfcB+5Keqg227uBelK37kx6zH+
w3Zp6pOkD1W7SnWDY9P7lMxujmH4BtR3p/C/6eBGklYIii9mY3ACzUfppMdPirzDBpPZqGkEr3w0
Y60pGLXcSWWmpYxHGvEMydZPGdC0M6CSNxcysLxZqqiBlo+Nc3j9usbz/hf9PAbVNU4SNR/ux1KO
M2MakxUYPuRDtbX0i1nqSlIM0hPWf4tQsscahEQXKowAG56FTUxxv+UnH8LBIKqNnPZvuP47m4i8
HMGz1npS3Nm9MMjtTmsVYFWU3EHAgjeP8L/p4C6cx6czD7cI6zcwsZqpsB1Ix1UGoDRrHEpd3Nyq
BeSbJWepKHqMGSE4rH8Ws7ksxuAxJOVnovSm2SVI5E57FnJZjmSbybXjA67LSeokyU+SSnFk9usW
WSJg6ML1ZTeDuWqaa6KsAJ1LJsbns9PUIY5UNzKd4fwv+ngE09NdNWnMZrHtbbss09S5klfNm0a0
9KhkkbVkBrNhI90tYetKR1diblp6hxHEgvZmNws1NSEw0XHxNJ8WzZuRG18tGT70V+V/GtlqKWQS
Ic7s1OdxGvc9GUdCZb+7mHWBu49YsYapLh2JB1XGsHT/AML/AKd/kk3AYknICz0XpTXtlJUji2Jz
2LMSzHEk4k6PoQL0Yl/cmbqrzmwhpk94/uSHrOdZ3JnqnuHZQdZjqAtfIehTqftwjIDWdZ3Ympm9
0n7kR6rjUbB4W6Myj7sJ6ynZrG5anq4xIhyvzU6wbFwDLSHqzAZX8TatN/C/6d/NPUOI4kF7MxuF
jS0ZMNHkxyaT27NmkFRUXw0QPWODSbF57JT0yCOJBcFHKdyVJ72rYfbhHK2oWNRVuXc9UdlRqUaF
aimcxyobwwstPUkRVoGIyWTavNuWilUPG2DKwvBs1Z6eDJTZvFm0fs1jS/wv+nfpqKp+iOyg6zHU
oseme7plP2oRkNrazo7hiTkLJW+qLdGbmjpzmdr81gqgKowAGAA3LUlARLV5M+aR85s00zmSRzez
MbySdGGUlWU3gjAgiy0fqrXP2Kk5HY9rxiDkdy9b6YoSbFpIBgH+HUbNHIpR0NzKcCCNGlYF6agF
HXWrZ3bbLUUrhlPWXtIdTDfZUnvath9uEcrahY1FW5dz1R2VGpRo1hhQySOblVReTZauuAlrM1XN
Y+c7ku5CqovLHAAWai9La6PESVHG2xOe15xJzOmWlriZaTJWzaPnFlmgcSRuL1ZTeMdyZoroa0ZS
DJ8MA1mp6qMxyKcjkdoPGNGtRSv0SD7y9lhqItcCIqpR78JP4rrG+WpKAiWryZ81j5zZpZnMkjm9
mY3kk6MU9InTY4s3ZUa2Nr1AkqmH3JiMfYuoblqipcRxJmx5BZoICYqIHBcmk2vzbxAB7ylYjvIT
q1rqNlqKVwynrL2lOphuTFULc4/blHWU27qoW+M9SUD3WGjSaFykqG9WGYNlpPUCI6rBUkyWTDj1
Hexd2CoovZjgALPRelsViyeoGBbYmoWvOJOj+2O7plP3JjkNi6zYU9KnRGbOesx1k7kzVLe8f24x
1nOwW7yc9GJf24QfdUf3O8xPSv0Th017LC++4iw6B7upUfchOY2rrG5anqoxJE2YPKLGaK+aiOIc
DFNj6O8WWj9TJeLARz5lNjaxZZI2Do4vVhiCDvNqiqcRxIMSePYNZsYYb4aIZJxvtfm0i1VYDFR5
gZNJ7NQ22WCBBHGguVRhuTEl01Yw92IHBb+N7NUVTmSRv6AagOIb1WaBzHIhvVlNxstLWERVnEcl
e7VqO5KSKGRhcynEEWes9MXpQi9pIBmo/wCOsWuOBGY0Yje+akY+9ETivwarLUUsgkQ53Zqc7iNe
8TLUNfIf24h1nNu8qGujUnuoR1UHPowqgknAAZ2Wt9VX3s46Y8r81gALgMABkBuWo/TWD1GIkmGK
x/DrNmklYu7m9mJvJO97wbiMiLJReqthgsdQeIan57BlIKnEEYgjctWengR1WJePsyYcWo2aKVSk
iG5lYXEHRiale4HB4z1WG0WBiboTqPuQnMHZrGnMEV0taRgnEm1+azVFU5klfMni2DZo1gp0Mkr4
Kq2WpqgJq0jPNY7+Jdu3ctJKwRFF7MTcALPRemsUp+q8wwZ/h1C1530tNVXy0RIGtoxrXmslRTuH
icXqw3JcXRVaj3JgM7uJtYsaeqQo4y1MNYOjWencxyob1ZcDZaaruhrLsDkslw4tR2aVqP0tg0w9
2SfNV1hdZsXkYs7G9mJvJOjEFKl4F3TkPVQaybdGIdOdv3JiPeOwahuWqKuQRxrxnMnUBx27pL4a
NerEDi219+9KI9OBru8hPVIv4tRsJ6V7/wA6HrKdRG5MFSl/GjjrKdht0ZR04GJ7uYZEbdR0d4Nx
GRFko/VWvXJKk5jUH57BkIZTiCMQdCXY9FVBLE5ACz0fp7GOlBuaUYNJ7NS6QOb4qRT78x49i6zZ
aalQIgzPGx1sdz3k7dKVh9uEdZjzW76pb3R+3EOqg2b/AFqKRyjrmOJhqYWCXiKrA96EnO7jXWNy
9PUIJInFzKbNU0oMtETnm0fxbNukEFRfNRHs9pNq81kqIWDxSAMrDUdA4jNxqHWEkflILH+oXSLW
eoKY6UYpEcGk5hZYoVCRoLlVRcABuTBARNWnALmI9rc1mqKmQySvmx5BwCssTFJFN6sDcRZaT1Ai
OqwVJMlkw49R3JVgGUi4g4giz1vpa3g3tJT6sL705rEEXEYEHR1NKxvFPIrJsEgOH9V0EtMhulBE
kV/514v98rNHIpV0JDKcCCNCERSzsblUYkmy1nqihpc46c4hdrazubzgBZ6L0tulJ1ZKgZLrCbdt
i7ks7G9mOJJPAd4wIslF6mxaLBY5ziV+PWLB42DIwvVhiCNy1VRgRVl15GSSXa9R22aGdDHKmDK2
B0NwsXnF09URIy8aqB7qnl0LeqUa/fQf9hB21HaG0aBaelQySvkBxbTqFhNNdNWnN+JNic+5aaZx
HGgvZmNwAs1JQExUuTPk0nMOBxDMTNRnNDmmOa2WopZBJE2TDXqO598d3Ur+3MufsOsWMFUhU49B
uy41qdAvqlYn2UN9PGe2w7ZGocWjPqFIv/VlP3EH/wCbH+x3Qip1uQfuSnqoLd3TrfIwHezHrOeb
ctUVThEGQ7THUosVN8VIpvSEH8W1ngkSwN0oz+5Ceqw57d7TN74u7yI9ZTuWp6pAyke63aU61NiW
BkpWN0cw5G1Hdd5MCKKE/cbLpHiQf3ssaAKii5VGAAGjeGZQ8bjospyINigBalkvMEh1flO0bgTS
Xw0an3pCMX2JZaeljEca8Q4zrO3c3yHp1DD7cIOJ2nULGeqe/wDIg6qDUBwWtRSuY5F4xxjUbCGW
6GsW4GM5Phmm5aGdBJG4uZWF4Is1XQgy0hN7IMWj5xuEpYcAcZJOJE4ybR0lMvRijFw1k8ZO06V6
SoGDYqwzVuJhZqeqS67FXHVYHIg2uGJOQstZ6mpWDNIDgz7W1CwSNQqKLlUYADcrFCnSqp1JjJ6q
gYdI67NPUOZJXN7MeDVkjYo6m9WGBBFh6fWC+pVSVlHbC59LbubiLwcwbPWelLc+b0wyOspt2WKO
CrDAqcCLJT0yGSVzcAOLadQsIVuad/enk/M2obBp+7qI1lTUwvt3sNJGrg3hrr7vZfu6Pwm+rg9P
Ck5N306mmSRz2iLj+FiKSBIQc+iMf674o/Cb6uD08KTk4Ao/Cb6uD08KTk4Ao/Cb6uD08KTk4Ao/
Cb6uD08KTk4Ao/Cb6uD08KTk4Ao/Cb6t5dzF7kaC+WU5KOc2AMAmfC95MTeNVvKRfKLeUi+UW8pF
8ot5SL5RbykXyi3lIvlFvKRfKLeUi+UW6LUyofzR+6bKwPeUsh+3JqP5W3knhScnAFH4TfVvKBwP
uVF8sh13m5f/AFA0dVAwvJjLIdTp7y/iN5J4UnJwBR+E31byoPATk0cnwtybyTwpOTgCj8Jvq3lQ
eAnJo5Phbk3knhScnAFH4TfVvKg8BOTRyfC3JvJPCk5OAKPwm+reVB4Ccmjk+FuTeSeFJycAUfhN
9W8qDwE5NHJ8Lcm8k8KTk4Ao/Cb6t5UHgJyaOT4W5N5J4UnJwBR+E31byoPATk0cnwtybyTwpOTg
Cj8Jvq3lQeAnJo5Phbk3knhScnAFH4TfVvKg8BOTRyfC3JvJPCk5OAKPwm+reVB4Ccmjk+FuTeSe
FJycAUfhN9W8qDwE5NHJ8Lcm8k8KTk4Ao/Cb6t5UHgJ9Ojk+E8m8k8KTk4Apa1ReImaN7uIPcQf/
AF3ikEKl5JGCoo4ybQ0y4iGNYwfgAX+2juNp6SQXd25CnWuan/cbxqK0j7cUfdqdbOQfwC8ASU86
h4pVKsp1GzPQD/JgOIHbGy7jt0WpJQfht5SX5Tbykvym3lJflNvKS/KbeUl+U28pL8pt5SX5Tbyk
vym3lJflNvKS/KbeUl+U28pL8pt5SX5TYKlK4vw6Te6o9pNhV1RElaQQLurGDndt0odT3dXGCI5O
I7GsVamaRR24/eU28pL8pt5SX5Tbykvym3lJflNvKS/KbeUl+U28pL8pt5SX5Tbykvym3lJflNvK
S/KbeUl+U28pL8ptcKSW8/8AGwNSn+LD2mfrXf8AFbJSUy3Rpx8bE5sf/if/AP/Z"
                transform="matrix(1 0 0 1 -10138.1563 -8651.8281)"
            ></image>
            <g>
                <path
                    d="M-2301.4-332.3c0-25.7,0.1-51.3-0.1-77c0-3.9,1.2-6.4,4.1-8.9c44.6-36.7,89.1-73.5,133.6-110.3
		c13.2-10.9,26.4-21.8,39.7-32.7c8.1-6.7,14.7-6.6,22.8,0.1c54.6,45.1,108.9,90.5,164,135.1c10.1,8.2,13.8,16.3,13.5,29.1
		c-0.8,46.1-0.3,92.3-0.3,138.5c0,2.2,0,4.3-0.1,6.5c-0.5,8.1-6,13.8-14.1,14c-11,0.3-22,0.2-33,0.2c-25.2,0-50.3-0.4-75.5,0.2
		c-12.7,0.3-18.8-8.7-18.7-18.8c0.5-29.3,0.2-58.7,0.2-88c0-13.7-5.7-19.4-19.5-19.4c-18.8-0.1-37.7,0-56.5,0
		c-13.3,0-19,5.9-19.1,19.3c0,29.2,0,58.3,0,87.5c0,13.7-5.3,19.2-18.9,19.2c-34.5,0-69,0-103.5,0c-14.1,0-18.8-4.8-18.8-19
		C-2301.4-282-2301.4-307.2-2301.4-332.3z"
                />
                <path
                    d="M-1994.3-595c0-23.6,0-46.1,0-68.6c0-11.2,3.4-14.6,14.6-14.7c16.5,0,33,0,49.5,0c10.4,0,14,3.7,14,14.2
		c0,43,0.1,86-0.1,129c0,3.8,1.2,6.1,4.1,8.4c25.3,20.3,50.4,40.7,75.6,61.1c8.6,6.9,9.4,12.8,2.6,21.2
		c-7.2,9.1-14.5,18.2-21.9,27.2c-6.3,7.7-11.8,8-19.6,1.6c-42.9-35.4-85.9-70.8-128.8-106.3c-32.7-27-65.3-54-98-80.9
		c-6.9-5.7-14.3-5.5-21.2,0.2c-66,54.4-132,108.9-198,163.3c-9.9,8.2-19.7,16.4-29.6,24.5c-6.3,5.1-12.2,4.9-17.4-1.4
		c-8.6-10.2-16.9-20.6-25-31.1c-4.4-5.7-3-12,3.5-17.4c10.1-8.4,20.3-16.7,30.5-25.1c70.8-58.2,141.7-116.4,212.5-174.7
		c16.9-13.9,35.3-19,55.3-8.5c9,4.7,16.6,12.1,24.6,18.6c23.1,18.8,46,37.8,69,56.7C-1997.3-596.8-1996.2-596.2-1994.3-595z"
                />
            </g>
            <g>
                <path
                    d="M-1221.8-378.4c2.7,0,4.9,0,7,0c131,0,262,0,392.9,0c2.8,0,5.6,0.3,8.4,0.8c6.9,1.3,11.2,5.5,11.4,12.4
		c0.4,11.1,0.4,22.3,0,33.5c-0.3,7.6-5.8,12.2-14.4,13c-1.3,0.1-2.7,0.1-4,0.1c-142.3,0-284.6,0-426.9,0c-11.7,0-21.7-3.4-28.3-13.5
		c-2.4-3.6-3.7-8.1-4.9-12.3c-0.7-2.5-0.4-5.3-0.4-8c0-102.3,0-204.6,0-307c0-6.7,0.3-13.2,7.2-16.8c1.9-1,4-1.9,6.1-1.9
		c11.6,0,23.3-0.1,34.9,0.6c6.1,0.4,10.1,5.2,10.9,11.2c0.3,2.5,0.3,5,0.3,7.5c0,91,0,182,0,273
		C-1221.8-383.5-1221.8-381.2-1221.8-378.4z"
                />
                <path
                    d="M-891.1-558.5c0-34.7,0-69.3,0-104c0-11.5,4.5-15.9,16.1-15.9c9.5,0,19,0,28.5,0c9.8,0.1,14.7,4.9,14.7,14.7
		c0,70.1,0,140.3,0,210.4c0,9.8-5,14.6-14.8,14.6c-9.8,0-19.7,0-29.5,0c-10.1,0-15-4.8-15-14.9
		C-891.1-488.5-891.1-523.5-891.1-558.5z"
                />
                <path
                    d="M-1071.1-543.5c0-29.7,0-59.3,0-89c0-11.5,4.5-15.9,16.1-15.9c9.5,0,19,0,28.5,0c9.8,0.1,14.7,4.9,14.7,14.7
		c0,60.1,0,120.3,0,180.4c0,9.8-5,14.6-14.8,14.6c-10,0-20,0.1-30,0c-9.5-0.1-14.5-4.9-14.5-14.4
		C-1071.2-483.2-1071.1-513.4-1071.1-543.5z"
                />
                <path
                    d="M-981.1-513.4c0-19.8,0-39.6,0-59.5c0-10.9,4.6-15.6,15.4-15.6c9.7,0,19.3,0,29,0c9.9,0.1,14.9,4.8,14.9,14.5
		c0.1,40.3,0.1,80.6,0,120.9c0,9.2-5,14.2-14.2,14.3c-10.3,0.1-20.7,0.1-31,0c-9.1-0.1-14.1-5-14.2-14.3
		C-981.2-473-981.1-493.2-981.1-513.4z"
                />
                <path
                    d="M-1101.8-483.3c0,10.2,0.1,20.3,0,30.5c-0.1,9.2-5,14.2-14.2,14.2c-10.3,0.1-20.6,0.1-31,0c-8.9-0.1-14.1-4.9-14.1-13.8
		c-0.1-20.8-0.1-41.6,0-62.4c0-8.3,5.1-13.4,13.4-13.5c10.8-0.2,21.6-0.2,32.5,0c8.3,0.1,13.2,5.2,13.4,13.5
		C-1101.7-504.3-1101.8-493.8-1101.8-483.3z"
                />
            </g>
            <g>
                <path
                    d="M-2143,343.9c-78,0-156,0-234,0.1c-4.3,0-5.8-0.8-5.8-5.5c0.2-31.8,0.1-63.7,0.1-95.5c0-2.2,0-4.3,0.3-6.5
		c0.7-6,4.6-10.3,10.4-11.9c2.6-0.7,5.3-0.7,7.9-0.7c147.5,0,295,0,442.5,0c2.3,0,4.7,0,7,0.4c6.2,1,10.7,5.9,11.4,12.1
		c0.2,1.8,0.3,3.7,0.3,5.5c0,32.3-0.1,64.7,0.1,97c0,4.3-1.2,5.1-5.2,5.1C-1986.3,343.9-2064.7,343.9-2143,343.9z M-2322.8,298.9
		c8.7,0,15.1-6.3,15.1-15.1c0-8.6-6.2-14.8-14.7-14.9c-8.8-0.1-15.2,6-15.3,14.8C-2337.8,292.5-2331.5,298.9-2322.8,298.9z
		 M-1962.7,298.9c8.7,0,15-6.5,14.9-15.2c-0.1-8.5-6.3-14.7-14.8-14.8c-8.8,0-15.1,6.3-15.2,14.9
		C-1977.7,292.6-1971.4,298.9-1962.7,298.9z"
                />
                <path
                    d="M-2142.8,373.9c78.2,0,156.3,0,234.5-0.1c4.2,0,5.6,0.7,5.5,5.3c-0.2,32-0.4,64,0,96c0.2,14.6-7.5,18.9-19,18.9
		c-147.5-0.2-295-0.1-442.5-0.1c-4.9,0-9.7-0.3-13.6-3.7c-3.5-3-4.8-7.1-4.8-11.6c0-33.8,0-67.7-0.1-101.5c0-4,2.3-3.2,4.5-3.2
		c33.2,0,66.3,0,99.5,0C-2233.4,373.9-2188.1,373.9-2142.8,373.9z M-2322.9,448.9c8.7,0.1,15.1-6.2,15.1-15c0-8.5-6.1-14.9-14.5-15
		c-8.9-0.1-15.2,5.9-15.4,14.7C-2337.9,442.4-2331.6,448.8-2322.9,448.9z M-1962.7,448.9c8.7,0,15-6.5,14.9-15.2
		c-0.1-8.5-6.3-14.7-14.8-14.8c-8.8,0-15.1,6.3-15.2,14.9C-1977.7,442.6-1971.4,448.9-1962.7,448.9z"
                />
                <path
                    d="M-2233,193.9c-37.8,0-75.6-0.1-113.4,0.1c-3.6,0-4.6-0.8-5-4.5c-1.4-15.4-1-30.7,2.9-45.6c4.9-18.4,12.7-35.4,29.3-46.5
		c14.6-9.8,30.8-10.1,47.4-6.1c12.1,2.9,24,6.6,35,12.6c2.9,1.6,5.3,1.4,8.2-0.1c16.6-8.4,34-14.4,52.7-14.8
		c19.5-0.4,34.8,8.2,45.9,24.3c14.9,21.5,18.1,45.6,16,70.9c-0.8,9.6-1.2,9.6-11.1,9.6C-2161,193.9-2197,193.9-2233,193.9z"
                />
                <path
                    d="M-2109.6,90c18.7,0.9,35.8,5.3,51.8,13.5c3.5,1.8,6.4,2,10.1,0.1c16.2-8.4,33.4-14.1,51.8-14.5
		c19.9-0.4,35.4,8.4,46.2,25.3c13.8,21.5,17.8,45.1,15.7,70.1c-0.8,9.4-0.9,9.3-10.3,9.3c-45,0-89.9-0.1-134.9,0.1
		c-4.6,0-5.6-1.2-5.1-5.5c2-16.3,1.1-32.6-2.3-48.6C-2090.4,121.9-2097.3,105.2-2109.6,90z"
                />
                <path
                    d="M-2053.1,63c-0.1-11.7,2-22.8,9.6-32.2c7.6-9.5,18-13.7,29.5-15.8c5.7-1,11.6-1.2,17.4-1c1.6,0.1,2.9-0.1,3,2.2
		c0.7,14.8-0.3,29.3-9.9,41.6c-7,9-16.9,13.1-27.7,15.1c-5.6,1-11.2,1.1-16.9,1.2c-4.1,0.1-5.3-1.4-5.1-5.1
		C-2053,67-2053.1,65-2053.1,63z"
                />
                <path
                    d="M-2232.7,62.4c-0.4-15.5,4.3-28.9,17-38.5c9.8-7.4,21.3-9.7,33.2-9.9c9.9-0.2,10.1,0,9.8,9.9c-0.4,11.5-2.1,22.9-9.1,32.6
		c-7.1,10-17.7,14.2-29.2,16.3c-5.5,1.1-11.2,1.2-16.9,1.2c-3.2,0-4.6-0.8-4.4-4.1C-2232.2,67.4-2232.5,64.9-2232.7,62.4z"
                />
            </g>
            <g>
                <path
                    d="M-422.3-438.6c49.3,0,98.6,0,148,0c15,0,26.8,8.7,30.6,22.3c1,3.4,1,6.9,1,10.4c0,57.8-0.3,115.6,0.2,173.4
		c0.2,22-16,34.1-34.2,34c-97.6-0.5-195.3-0.2-292.9-0.2c-16.1,0-27.3-7.9-31.8-22.1c-1.1-3.4-1.1-6.9-1.1-10.4
		c0-58,0.3-116-0.2-173.9c-0.2-21.4,15.9-34,33.9-33.7C-520-438.2-471.2-438.6-422.3-438.6z M-362.9-355.8c0,0-0.1,0-0.1,0
		c0,3.2,0,6.3,0,9.5c-0.5,36.1-34.6,63.1-70.3,56.7c-26.7-4.8-48.2-30.2-48.8-57.4c-0.2-7.2-0.1-14.3-0.2-21.5
		c-0.1-8.1-2.2-10-10.1-10.1c-4,0-8,0-12,0c-5.4,0.1-8.1,1.9-8.3,7.1c-0.6,15.8-1.3,31.9,3.8,47c12.2,36.2,35.5,60.1,75.2,65.1
		c38.4,4.9,72.1-13.9,90.6-46.3c8-14,10.4-29.3,10.7-45c0.1-7.1,0.6-14.3-0.4-21.4c-0.6-4.4-2.9-6.5-7.3-6.4c-4.7,0-9.3,0-14,0
		c-6.1,0-8.5,2.2-8.7,8.3C-363.1-365.5-362.9-360.7-362.9-355.8z"
                />
                <path
                    d="M-782.3-378.7c0-38.8,0.7-77.7-0.3-116.5c-0.5-22.1,17-34,33.6-33.6c27.1,0.7,54.3,0.1,81.5,0.3c4.2,0,5.3-1.1,5.3-5.3
		c-0.2-20.5-0.4-41,0.1-61.5c0.5-19.8,8.1-37.1,21.2-52c13.9-15.8,30.9-26.1,51.8-29.6c31.4-5.2,58.6,2.9,81,25.7
		c16.5,16.8,25,37,25,60.6c0,19,0.1,38,0,57c0,4,1.1,5.1,5,5c27.7-0.2,55.3,0.4,83-0.3c15.8-0.4,33.5,12.3,32.1,32.4
		c-0.5,7.3-0.4,14.7,0,22c0.3,5.1-1.5,6-6.2,5.9c-43.8-0.2-87.7-0.1-131.5-0.1c-32.2,0-64.4,0.8-96.5-0.3
		c-20.9-0.7-36.2,12.6-36.1,36.5c0.4,65.7,0.1,131.3,0.1,197c0,6.8,0,6.8-6.6,6.8c-37.3,0-74.7,0-112,0c-14.4,0-25.9-8.8-29.9-22.7
		c-1-3.3-0.7-6.6-0.7-9.9C-782.3-300.4-782.3-339.6-782.3-378.7z M-573.2-528.6c13.8,0,27.6-0.1,41.4,0.1c3.5,0,4.6-1,4.5-4.5
		c-0.2-17.6,0.1-35.3-0.1-52.9c-0.1-11.7-3.1-22.5-10.9-31.8c-13.2-15.6-35.3-20.2-52.9-11.9c-18.5,8.7-26.7,24.5-26.8,44.6
		c-0.1,17.1,0.1,34.3-0.1,51.4c0,3.8,0.9,5.2,5,5.1C-599.8-528.8-586.5-528.6-573.2-528.6z"
                />
            </g>
            <path
                d="M67.3-316c-74,0-148,0-222,0c-19.6,0-34.2-8.2-43.4-25.6c-3.5-6.6-4.3-13.9-4.3-21.3c0-88.8,0.2-177.7-0.1-266.5
	c-0.1-22.6,15.2-41,34.1-45.2c4.4-1,8.8-1.5,13.3-1.5c148.3,0,296.7,0,445,0c19.2,0,33.6,7.9,42.8,24.8c3.7,6.9,4.7,14.4,4.7,22.2
	c0,88.3-0.1,176.7,0.1,265c0,19.8-8.1,34.6-25.8,43.7c-6.9,3.6-14.6,4.3-22.3,4.3C215.3-316,141.3-316,67.3-316z M67.9-436
	c-35.1,0-70.3,0-105.4,0c-1.8,0-3.7,0-5.5,0.1c-5.6,0.5-8.7,3.1-9.1,8.6c-1.1,14.3-1,28.6,0,42.9c0.3,4.8,3.5,7.4,8.1,8.1
	c2.1,0.3,4.3,0.3,6.5,0.3c69.8,0,139.6,0,209.4,0c2,0,4,0,6-0.1c5.6-0.5,8.7-3.1,9.2-8.7c1-14.3,1-28.6,0-42.9
	c-0.4-4.9-3.6-7.3-8.1-8c-2.1-0.4-4.3-0.3-6.5-0.3C137.6-436,102.8-436,67.9-436z M-112.3-616C-112.3-616-112.3-616-112.3-616
	c-6.3,0-12.6-0.1-19,0c-7.2,0.2-10.6,2.9-11,10c-0.7,13.3-0.8,26.6,0.1,39.9c0.5,7.2,3.4,9.9,10.5,10c12.8,0.2,25.6,0.2,38.4,0
	c6.8-0.1,9.9-2.8,10.4-9.5c1-13.6,1-27.3,0-40.9c-0.5-6.6-3.7-9.3-10.4-9.5C-99.7-616.1-106-616-112.3-616z M-22.3-616
	C-22.3-616-22.3-616-22.3-616c-6.3,0-12.6-0.2-19,0c-7.2,0.2-10.7,2.9-11.1,10c-0.7,13.4-0.9,26.9,0.1,40.4
	c0.5,6.7,3.5,9.4,10.4,9.5c12.8,0.2,25.6,0.2,38.4,0c7-0.1,10.1-2.8,10.5-10C8-579.5,8.1-593,7.1-606.5c-0.5-6.7-3.7-9.3-10.4-9.5
	C-9.7-616.1-16-616-22.3-616z M67.4-556.1c6.3,0,12.6,0.1,19,0c7.1-0.2,10.2-2.8,10.7-9.8c0.9-13.4,0.9-26.9,0-40.4
	c-0.5-6.9-3.7-9.6-10.7-9.7c-12.6-0.2-25.3-0.2-37.9,0c-6.9,0.1-10.4,2.9-10.7,9.7c-0.8,13.4-0.9,26.9,0.1,40.4
	c0.5,7,3.6,9.5,10.7,9.8C54.8-555.9,61.1-556,67.4-556.1z M157.1-556.1C157.1-556.1,157.1-556,157.1-556.1c6.3,0,12.6,0.1,19,0
	c7.4-0.2,10.6-2.7,11.1-10c0.9-13.3,0.9-26.6,0-39.9c-0.5-7.3-3.6-9.9-10.9-10c-12.5-0.2-25-0.2-37.4,0c-7.3,0.1-10.7,2.9-11.1,9.9
	c-0.7,13.4-0.9,26.9,0.1,40.4c0.5,6.8,3.5,9.3,10.4,9.5C144.4-555.9,150.8-556.1,157.1-556.1z M247.5-616
	C247.5-616,247.5-616,247.5-616c-6,0-12,0-18,0c-0.3,0-0.7,0-1,0c-7,0.3-10.4,2.9-10.8,9.7c-0.8,13.6-0.9,27.3,0.1,40.9
	c0.5,6.3,3.4,9.1,9.6,9.2c13.3,0.3,26.6,0.3,39.9,0c6.2-0.1,9.2-2.9,9.7-9.1c1.1-13.6,0.9-27.3,0.1-40.9c-0.4-7-3.6-9.6-10.6-9.8
	C260.1-616.1,253.8-616,247.5-616z M-67.7-526c-6.3,0-12.6-0.1-19,0c-6.9,0.2-10.3,3-10.7,9.8c-0.7,13.4-0.9,26.9,0.1,40.4
	c0.5,6.8,3.5,9.5,10.3,9.6c13,0.2,26,0.2,38.9,0c6.5-0.1,9.6-2.9,10.1-9.3c1-13.4,0.9-26.9,0.1-40.4c-0.4-7.5-3.7-10-11.4-10.1
	C-55.4-526.1-61.5-526-67.7-526z M22.3-526C22.3-526,22.3-526,22.3-526c-6,0-12,0-18,0c-0.3,0-0.7,0-1,0c-6.9,0.4-10.3,3-10.7,9.9
	c-0.7,13.4-0.9,26.9,0.1,40.4c0.5,6.8,3.5,9.5,10.3,9.6c13,0.2,26,0.2,38.9,0c6.5-0.1,9.6-2.9,10.1-9.4c1-13.4,0.9-26.9,0.1-40.4
	c-0.4-7.5-3.7-10-11.4-10.1C34.6-526.1,28.5-526,22.3-526z M112.2-466C112.2-466,112.2-466,112.2-466c6.5,0,13,0.1,19.5-0.1
	c6.8-0.2,9.9-2.8,10.4-9.5c1-13.4,0.9-26.9,0.1-40.4c-0.5-7.3-3.6-9.9-11-10c-12.5-0.1-25-0.2-37.4,0c-7.2,0.1-10.6,2.9-11,10
	c-0.7,13.3-0.8,26.6,0.1,39.9c0.5,7.3,3.6,9.8,11,10C99.9-465.9,106-466,112.2-466z M202.2-466C202.2-466,202.2-466,202.2-466
	c6.5,0,13,0.1,19.5-0.1c6.8-0.2,9.9-2.8,10.4-9.5c1-13.4,0.9-26.9,0.1-40.4c-0.5-7.3-3.6-9.9-11-10c-12.5-0.1-25-0.2-37.4,0
	c-7.2,0.1-10.6,2.9-11,10c-0.7,13.3-0.8,26.6,0.1,39.9c0.5,7.3,3.6,9.8,11,10C189.9-465.9,196-466,202.2-466z M-113-376.1
	c6.7,0,13.3,0.2,20-0.1c6.4-0.2,9.6-2.9,10-9.4c1-13.6,1-27.3,0-40.9c-0.5-6.7-3.6-9.5-10.3-9.6c-12.8-0.2-25.6-0.2-38.4,0
	c-6.9,0.1-10.3,3-10.6,9.9c-0.7,13.4-0.9,26.9,0.1,40.4c0.5,6.8,3.5,9.4,10.3,9.6C-125.6-375.9-119.3-376.1-113-376.1z M247.1-376.1
	C247.1-376,247.1-376,247.1-376.1c6,0,12,0,18,0c0.3,0,0.7,0,1,0c7.4-0.3,10.6-2.8,11-10c0.8-13.4,0.9-26.9-0.1-40.4
	c-0.5-6.6-3.7-9.4-10.4-9.5c-12.8-0.2-25.6-0.2-38.4,0c-6.9,0.1-10.2,3-10.5,9.9c-0.7,13.4-0.9,26.9,0.1,40.4
	c0.5,6.7,3.5,9.3,10.4,9.5C234.5-375.9,240.8-376.1,247.1-376.1z"
            />
            <g>
                <path
                    d="M501.2-394.2l0.4-187.1h-57v-45.9c8.7,0,17.1-1.1,25.2-3.3c8.2-2.2,15.2-5.4,21-9.8c4.3-3.3,8.4-8,12.2-14.2
		c3.8-6.1,5.7-12.6,5.7-19.5h44.8v279.6H501.2z"
                />
                <path
                    d="M741.2-650.1c16.1,18.1,24.1,38.1,24.1,60.1c0,21.7-5.8,38.4-17.4,50.1c-11.6,11.7-23,21.8-34.2,30.2l-51.3,37.9
		c-6.6,4.8-11.8,9.1-15.5,12.6c-3.7,3.6-6.6,7.8-8.6,12.6l125.9,0.4l-0.4,47.4l-186.3,0.4c0-19.9,2.9-39.4,8.6-58.5
		c5.7-19.1,21.5-37.9,47.2-56.2l45.5-32.5c7.4-5.4,14.7-11.2,21.8-17.6c7.1-6.4,11-15,11.5-26c0.5-10.5-2.7-20-9.8-28.5
		c-7-8.5-16.9-12.8-29.6-12.8c-13.5,0-23.8,5-31,14.9c-7.1,9.9-10.6,21.9-10.3,36h-50.9c-1.3-24,6.1-46.2,22.2-66.8
		c16.1-20.5,39.5-30.8,70.4-30.8C702.5-677.3,725.2-668.2,741.2-650.1z"
                />
                <path
                    d="M970.2-514.9c8,11.6,12,24.3,12,38.1c0,23.7-9.2,44-27.5,60.8c-18.4,16.8-41.6,25.2-69.6,25.2c-27,0-50.2-8.6-69.6-25.8
		c-19.4-17.2-28.2-39.7-26.4-67.5h51.3c-0.8,13.5,3.1,24.3,11.5,32.3c8.4,8,19.4,12,32.9,12c13,0,23.4-3.6,31.2-10.9
		c7.8-7.3,12.2-16,13.2-26.2c0.5-7.9-1.7-15.2-6.7-21.8c-5-6.6-11.8-11.5-20.5-14.5c-6.1-1.5-12.6-2.4-19.3-2.7
		c-6.8-0.3-13.1-0.4-18.9-0.4v-47.1c7.9,0,15.2-0.6,22-1.7c6.8-1.1,12.8-3.1,18.2-5.9c4.6-2.5,8.5-6.1,11.9-10.5
		c3.3-4.5,5.1-10,5.4-16.6c0.5-7.7-2.1-15.2-7.8-22.8c-5.7-7.5-15.2-11.3-28.5-11.3c-12.8,0-22.4,3.8-28.9,11.5
		c-6.5,7.7-9.5,17-9,27.9h-50.5c-1.3-24.5,6.6-44.9,23.7-61.2c17.1-16.3,38.5-24.5,64.3-24.5c26.5,0,48,7.8,64.5,23.5
		c16.4,15.7,24.7,33.9,24.7,54.5c0,16.1-3.4,29-10.3,38.8c-6.9,9.8-14.2,16.8-21.8,20.8C952.5-535.1,962.1-526.5,970.2-514.9z"
                />
            </g>
            <path
                d="M-1545.2,362.5c-54.1,40.8-113.6,50.8-177.3,32.9c-45.3-12.7-80.1-41.2-106.1-80c-51.2-76.5-38.6-182,26.5-245.9
	c73-71.7,189-71.8,259.5-12.2c40,33.8,65.4,76,70.8,128.9c5.4,52.3-7,99.8-40,142.6c5.2,0,9.4,0,13.7,0c7.4,0,13.4,2.6,18.7,7.9
	c30.2,30.4,60.5,60.6,90.8,90.9c10.9,10.9,11,23.8,0.3,34.7c-8.8,8.9-17.5,17.8-26.8,26.2c-7.7,7-19.2,6.9-27.5,0.5
	c-2-1.5-3.8-3.2-5.6-5c-28.7-28.6-57.1-57.4-86-85.8c-7.8-7.6-12.2-15.9-11.1-26.9C-1545,368.6-1545.2,366-1545.2,362.5z
	 M-1545.3,208.8c0.3-66.8-55.3-120.5-120.6-120.2c-65.7,0.3-119.8,55-119.6,120.3c0.2,67.1,56,120.2,120.5,120
	C-1599.8,328.7-1544.8,274.6-1545.3,208.8z"
            />
            <path
                d="M-1280.9,103.1c-5.5-25-10.9-49.4-16.4-73.9c-2-9,2.7-15.1,12-15.2c12-0.1,24-0.1,36,0c9.3,0,11.9,2.3,13.7,11.5
	c4.9,24.7,9.9,49.4,14.7,74.2c0.5,2.7,1.5,3.5,4.1,3.5c31.8-0.1,63.7-0.1,95.5,0.1c3.7,0,3.9-2.1,4.4-4.4
	c5.7-24.4,11.4-48.8,17.1-73.2c2.3-9.7,4.5-11.5,14.4-11.5c12,0,24-0.1,36,0c8.7,0,11.6,2.3,13.6,10.8c5.8,24.7,11.5,49.4,17.1,74.2
	c0.7,3.1,1.8,4.2,5.2,4.2c31.7-0.2,63.3-0.1,95,0c3.3,0,4.4-0.9,4.9-4.3c3.8-25,8-49.9,12-74.8c1-6.4,4.6-9.8,11.2-9.9
	c14.5-0.2,29-0.2,43.5,0c8.1,0.1,12.7,6.6,10.7,14.8c-5.3,23-10.7,45.9-16.1,68.8c-0.4,1.6-0.7,3.2-1.1,5.3c14,0,27.8,0,41.6,0
	c2.7,0,5.3,0,7.9,0.9c3.6,1.3,5.9,3.7,6.1,7.6c0.7,14.2,0.6,28.3,0,42.5c-0.2,4.9-3.1,7.8-8,8.6c-3.7,0.6-7.3,0.4-11,0.4
	c-15.7,0.1-31.3,0-47,0c-1.9,0-3.8-0.6-4.4,2.4c-1.8,9.1-3.9,18.1-6,27.6c20.6,0,40.8,0,60.9,0c2.3,0,4.7,0,7,0.3
	c5.7,0.8,8.4,3.5,8.6,9.2c0.3,13.2,0.4,26.3,0.2,39.5c-0.1,7.8-3.3,10.5-11.2,11c-1.5,0.1-3,0-4.5,0c-23.5,0-47,0.1-70.5-0.1
	c-3.3,0-4.7,0.6-5.5,4.2c-10.9,48-22,96-33.1,144c-1.8,7.6-3.3,15.3-5.3,22.8c-1.7,6.6-4.3,8.8-10.8,8.9c-18,0.2-36,0.2-54,0
	c-5.9-0.1-8.6-2.8-10.3-9.6c-3.6-15-7.2-30-10.7-45c-7.5-32.1-15-64.2-22.5-96.4c-2-8.4-4-16.8-5.8-25.2c-0.6-3-2-3.9-5-3.8
	c-14.7,0.2-29.3,0.2-44,0c-2.9,0-3.9,0.8-4.6,3.6c-11.4,50-22.8,100-34.3,150c-1.3,5.8-2.6,11.6-4.1,17.4c-1.4,5.8-4.5,8.8-10.4,8.9
	c-18.3,0.2-36.7,0.2-55,0c-5.6-0.1-8.2-2.8-9.6-9c-5-21.5-9.9-43-14.7-64.5c-6.2-27.7-12.3-55.4-18.5-83c-1.5-6.6-3.3-13.2-4.5-19.9
	c-0.5-3.1-1.8-3.5-4.5-3.5c-23.8,0.1-47.7,0.1-71.5,0c-2.3,0-4.7,0-7-0.5c-4.4-0.8-7.2-3.5-7.4-8.1c-0.6-14.3-0.7-28.6,0-43
	c0.2-4.1,2.7-6.7,6.6-7.7c2.4-0.6,4.9-0.7,7.4-0.7c19.3-0.1,38.7-0.1,58,0c3.7,0,4.4-0.8,3.3-4.4c-2.1-6.8-3.8-13.8-5.2-20.8
	c-0.7-3.8-2.1-5.1-6.1-5c-16.8,0.2-33.7,0.1-50.5,0.1c-11,0-13.9-2.9-14-13.9c-0.1-11-0.1-22,0-33c0.1-10,3.2-13.1,13.2-13.1
	C-1309.7,103.1-1295.5,103.1-1280.9,103.1z M-927.4,163.1c-24.8,0-49.2,0-73.6,0c-2.9,0-2.1,1.4-1.8,3c1.8,7.9,3.6,15.8,5.1,23.8
	c0.5,2.4,1.4,3.3,3.9,3.3c19-0.1,37.9-0.1,56.9,0c1.8,0,3-0.1,3.4-2.4C-931.7,181.6-929.5,172.6-927.4,163.1z M-1131.9,163.1
	c-24.7,0-49,0-73.3-0.1c-2.6,0-2.6,1.2-2.2,3c1.6,8.1,3.3,16.3,4.7,24.4c0.4,2.2,1.4,2.6,3.3,2.6c19.1,0,38.3,0,57.4,0
	c1.7,0,2.8-0.3,3.3-2.2C-1136.5,181.7-1134.2,172.6-1131.9,163.1z M-1173,348.1c2.2-2.3,2.1-4.5,2.3-6.6c0.8-6.9,1.2-13.9,2.6-20.8
	c4.4-21.4,9.1-42.8,13.9-64.2c0.7-3.1,0-3.6-2.9-3.6c-9.2,0.1-18.3,0.2-27.5,0c-4-0.1-4.6,0.9-3.8,4.7c5.1,24.2,10.7,48.2,12.9,72.9
	C-1174.9,336.3-1173.8,341.9-1173,348.1z M-964.5,347.1c2.3-15.7,4.5-31.3,7.9-46.7c3.2-14.7,6.6-29.4,9.8-44.1
	c0.3-1.5,1.2-3.2-1.8-3.2c-11.3,0.1-22.6,0-34,0C-976.8,284.7-966.8,315.1-964.5,347.1z M-1056,192.9c-1.9-9.1-3.9-18-5.7-26.9
	c-0.4-2.2-1.3-3.2-3.6-3c-2,0.2-4,0.1-6,0c-1.6-0.1-2.5,0.4-2.9,2c-2,9.2-3.9,18.4-5.9,27.9C-1071.9,192.9-1064,192.9-1056,192.9z"
            />
            <path
                d="M-586.7,129.6c-41.3,0-82.7,0-124,0c-9.5,0-10.9-1.4-10.9-11.1c0-3.3-0.1-6.7,0-10c0.2-7,2-8.9,9-8.9
	c15.3-0.1,30.7-0.2,46,0.1c4.3,0.1,5.1-1.2,5.1-5.3c-0.1-15-0.2-30,0.4-45c0.7-18.4,17.9-36.5,36.2-39c4.5-0.6,8.9-0.9,13.4-0.9
	c77.3,0,154.7,0.1,232,0c19.6,0,34.2,8.1,43.3,25.6c3.5,6.8,4.4,14.2,4.4,21.8c0,12.7,0.1,25.3-0.1,38c-0.1,3.6,0.7,4.8,4.6,4.8
	c13.8-0.1,27.7-0.7,41.5,0.3c11.3,0.8,20.5,6,28.4,13.9c30.4,30.4,60.8,60.9,91.2,91.2c10.1,10.1,14.6,22.1,14.5,36.4
	c-0.2,31,0,62-0.2,93c0,4.1,0.9,5.6,5.2,5.2c4-0.4,8-0.2,12,0.2c7.2,0.7,12.4,5.7,12.6,13c0.4,10.5,0.5,21,0.2,31.5
	c-0.2,10-5.7,15.2-15.8,15.3c-13.2,0.1-26.3,0.2-39.5-0.1c-3.6-0.1-4.9,0.7-4.9,4.6c-0.5,44.1-38.6,82.1-81.7,85.1
	c-43.7,3-83-23.4-94.7-65.5c-1.8-6.5-3.1-13.3-2.7-20.2c0.1-3-0.8-4-4-4c-37.7,0.1-75.3,0.1-113,0c-3.3,0-3.8,1.4-3.9,4.1
	c-0.7,26.1-11.6,47.3-31.2,64.4c-18.3,15.9-39.7,22.7-63.5,21.2c-36-2.2-61.2-20.9-77.1-52.6c-6-12-7.7-25.3-7.7-38.7
	c0-38,0.1-76-0.1-114c0-4.1,1.4-4.4,4.8-4.4c44.8,0.1,89.7,0.1,134.5,0.1c9.2,0,10.8-1.6,10.8-10.7c0-4.5,0.3-9-0.4-13.5
	c-0.6-3.7-2.8-5.5-6.4-5.8c-1.8-0.1-3.7-0.1-5.5-0.1c-62.2,0-124.3,0-186.5,0c-9.9,0-11.2-1.3-11.2-11.2c0-3.7-0.1-7.3,0-11
	c0.3-5.7,2.3-7.6,8.1-7.8c1.3,0,2.7,0,4,0c72.2,0,144.3,0,216.5,0c10,0,11.4-1.4,11.3-11.6c0-4-0.2-8-0.4-12
	c-0.2-4.3-2.7-6.2-6.8-6.4c-1.7-0.1-3.3-0.1-5-0.1c-62.3,0-124.7,0-187,0c-9.3,0-10.8-1.5-10.8-10.6c0-4.2,0-8.3,0.1-12.5
	c0.1-4.5,2.7-6.6,7-6.8c1.5-0.1,3,0,4.5,0c72.5,0,145,0,217.5,0c9.4,0,10.9-1.5,10.9-11c0-3.7,0.2-7.3-0.1-11
	c-0.5-6.1-2.4-7.8-8.5-8c-1.3,0-2.7,0-4,0C-505,129.6-545.8,129.6-586.7,129.6z M-264.2,249.6c21.2,0,42.3,0,63.5-0.1
	c1.4,0,4,1.1,4-1.4c0-4.3,1.4-8.6-2.6-12.5c-29.6-29.3-59-58.8-88.4-88.3c-1.9-1.9-3.7-2.8-6.5-2.8c-11,0.2-22,0.2-33,0
	c-3.8-0.1-4.7,0.9-4.7,4.7c0.2,32,0.2,64,0,95.9c0,3.9,1.1,4.6,4.7,4.6C-306.1,249.5-285.2,249.6-264.2,249.6z M-527,402.5
	c2-24.6-16.4-45.8-41.6-47.8c-24-1.9-47,16.8-48,43.2c-1,23.9,17.5,44.8,41.7,46.6C-549.9,446.4-527.6,426.6-527,402.5z M-227,396.6
	c-0.9-24.4-23.1-43.7-48-41.9c-23.9,1.8-45.2,23.4-41.1,52.1c3,20.7,22.6,39.9,48.1,37.6C-243,442.2-224.8,420.9-227,396.6z"
            />
            <g>
                <path
                    d="M224.5,298.3c42.5-4.6,80.7-19.5,113.8-46.9c31.2-25.8,50.7-57.6,51.5-99.2c0.4-21.7-4.3-42.3-15.1-61.1
		c-17-29.8-42.6-50.5-72.5-66.3C268.8,7.2,232.8,0.5,195.4,0c-5,0.2-10,0.4-15,0.8c-5,0.3-9.9,0.8-14.9,1.3
		C122.1,6.4,83.4,22.1,49.9,50.4c-21.1,17.9-37.4,39.1-45,66.1c-7.2,25.7-6.4,51.2,3.2,76.3c5.8,15.1,14.3,28.4,25,40.4
		c1.3,1.5,2.9,2.7,1.5,5.5c-7.3,14.8-15.7,28.9-26.6,41.3c-2.3,2.6-4.8,5.2-6.5,8.2c-3.7,6.4-0.4,12,6.9,11.8
		c6.3-0.1,12.6-0.6,18.9-1.4c21.3-2.8,41.3-9.5,59.9-20.3c2.6-1.5,4.8-1.4,7.4-0.2c12.3,5.8,25.1,10.5,38.3,13.9
		C163.1,299.8,193.6,301.7,224.5,298.3z M175.8,239.2c-3.4-0.7-4.4-1.8-4.4-5.3c0-5.2,0-10.5,0-15.7c0-1.2-0.3-1.7-1.4-2.1
		c-7.3-2.7-13.9-6.5-19.9-11.4c-0.8-0.7-1.4-0.8-2.4-0.2c-4.3,2.7-8.7,5.2-13.1,7.9c-2.9,1.7-5,1.4-7.3-1.1
		c-6.9-7.7-12.5-16.2-16.6-25.7c-1.2-2.7-2.2-5.4-3.1-8.2c-0.8-2.2,0-3.8,2.3-5.2c4.5-2.7,9-5.5,13.6-8c1.4-0.8,1.8-1.6,1.5-3.1
		c-1.2-7.3-1.2-14.6,0-21.9c0.2-1.4-0.1-2.2-1.4-2.9c-4.7-2.7-9.3-5.5-14-8.3c-2.2-1.3-2.8-2.8-2-5.3c3.8-11.4,9.4-21.8,17.2-30.9
		c0.9-1.1,1.8-2.2,2.8-3.3c1.7-1.8,3.2-2.2,5.4-1c4.7,2.6,9.3,5.2,14,7.9c1.3,0.7,2.2,0.8,3.4-0.2c5.7-4.8,12.2-8.4,19.2-11
		c1.4-0.5,1.7-1.2,1.7-2.6c-0.1-2.6,0-5.2,0-7.9c0,0,0,0,0.1,0c0-2.9-0.1-5.8,0-8.6c0.1-2.5,1.2-3.7,3.6-4.2
		c12.9-2.7,25.8-2.7,38.8-0.2c3.8,0.7,4.6,1.7,4.6,5.5c0,5.2,0,10.3,0,15.5c0,1.2,0.3,1.9,1.5,2.3c7.3,2.7,14,6.5,19.9,11.4
		c0.8,0.7,1.5,0.7,2.4,0.1c4.4-2.7,8.8-5.3,13.3-7.9c2.7-1.6,4.7-1.4,6.8,0.9c9,9.9,15.6,21.2,19.8,33.9c0.9,2.7,0.4,4-1.9,5.5
		c-4.6,2.8-9.3,5.6-14,8.3c-1.2,0.7-1.7,1.4-1.4,2.8c1.2,7.4,1.2,14.8,0,22.3c-0.2,1.3,0.2,2.1,1.4,2.8c4.8,2.7,9.5,5.6,14.3,8.5
		c2,1.2,2.4,2.7,1.5,5.4c-3.1,9.1-7.3,17.7-13,25.5c-2.1,2.9-4.4,5.5-6.7,8.2c-2,2.3-3.8,2.5-6.4,1c-4.6-2.7-9.1-5.3-13.7-8
		c-1-0.6-1.5-0.5-2.4,0.2c-5.9,4.9-12.5,8.7-19.7,11.4c-1.2,0.5-1.7,1-1.7,2.4c0.1,5.2,0.1,10.3,0,15.5c0,3.7-0.9,4.7-4.5,5.4
		C201.2,241.9,188.5,241.9,175.8,239.2z"
                />
                <path
                    d="M224.4,150.1c0-16.5-13.6-29.6-29.7-29.5c-16.2,0.1-29.4,13.5-29.3,29.5c0.1,16.4,13.4,29.6,29.5,29.4
		C211,179.5,224.4,166.2,224.4,150.1z"
                />
                <path
                    d="M506.3,360.5c-1.5-3.1-1.4-5,0.9-7.7c20.5-23.1,32.1-49.7,32.5-80.9c0.3-22.6-5.2-43.7-16.8-63.1
		c-14.6-24.4-35-42.9-59.1-57.4c-13.8-8.3-28.5-14.8-44.2-19.4c0,5.2-0.1,10.1,0,15.1c0.6,23.5-3.9,45.9-14.1,67.1
		c-13.5,28.1-34.1,50-59,68.4c-39.4,29.2-83.9,43.9-132.7,46.9c-16.1,1-32.2,0.8-49-1.1c2.5,4.1,4.6,7.7,6.9,11.1
		c20.2,30,48.6,49.7,81.4,63.2c42.4,17.5,86.6,21.1,131.7,14.2c19.4-3,38.2-8.3,56-16.8c5.5-2.7,10-2.8,15.6,0.4
		C479.1,413,503.4,419,529,420c3.8,0.2,7.5,0.2,9.5-3.8c2.2-4.3,0.9-7.9-2.2-11.3C524,391.7,514.2,376.7,506.3,360.5z"
                />
            </g>
        </svg>
    )
}

export default CogChatIcon
