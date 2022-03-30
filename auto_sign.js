// ==UserScript==
// @name         自动签到
// @namespace    http://www.kimwu.com/
// @version      1.0.0
// @description  PT站点自动签到脚本
// @author       kimwu
// @include     *://ourbits.club/*
// @include     *://hdhome.org/*
// @include     *://hdchina.org/*
// @include     *://pterclub.com/*
// @include     *://lemonhd.org/*
// @include     *://pthome.net/*
// @include     *://pt.soulvoice.club/*
// @include     *://1ptba.com/*
// @include     *://www.hddolby.com/*
// @include     *://hdzone.me/*
// @include     *://hddisk.life/*
// @include     *://discfan.net/*
// @include     *://www.hdarea.co/*
// @include     *://hdcity.city/*
// @include     *://dhcmusic.xyz/*
// @include     *://totheglory.im/*
// @include     *://www.nicept.net/*
// @include     *://yingk.com/*
// @include     *://hdstreet.club/*
// @include     *://52pt.site/*
// @include     *://moecat.best/*
// @include     *://pt.hd4fans.org/*
// @include     *://www.haidan.video/*
// @include     *://www.pttime.org/*
// @include     *://hdtime.org/*
// @include     *://hdatmos.club/*
// @include     *://hdsky.me/*
// @include     *://open.cd/*
// @include     *://u2.dmhy.org/*
// @exclude     */showup.php*
// @exclude     */shoutbox.php*
// @exclude     */fun.php*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMjY4M0Y2MTVGOTExRUM5OUI4OEY5OUFENjI0QUEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzMjY4M0Y3MTVGOTExRUM5OUI4OEY5OUFENjI0QUEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTMyNjgzRjQxNUY5MTFFQzk5Qjg4Rjk5QUQ2MjRBQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTMyNjgzRjUxNUY5MTFFQzk5Qjg4Rjk5QUQ2MjRBQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5pl4XCAAAhD0lEQVR42ux9B5wcxZX+V9U9PTM7m1craYOyCELkYBMlRBKYYEAEH8lgc2BzvsP4fH/O/sH/gu3zYTibdNiG8xmDSTKYbImMCAZEPPBZRkJalLU5TupQda+qZ1fSamZ2drU7GzRlDzua6emuqve99773KjEpJQplzy280AUFABRKAQCFUgBAoRQAUCgFABRKAQCFsicVM9cLGdv+ftY5H6KotgtupwWzOEGfBOBJD0wycMbhEqwEfRosj6Pjkxpsemb/Ae7tYdZXP0SwKl7Nur3FdJOgFw/80XPNVaysE65L14Cl/a2UAga3YBgB5CunIThHMJFEMGnT+/T1YlQVj/rBscL03jgYTCyWXNjUj08IgYZ4UmR9hmqLFTJgBAxI4beL02fcpT6GAWE6JD0HicZyhCIxtDfWYOuyuTv8fpgBMJTCuIDwBjYyUhrUP9Q4iOsk2FmQCMKQbzCIfxJSbvAFmxkAEvlNZqnqcJKwFXBJyDwDAKglJChbshnUuOvpg5OomjZ9qKT0D/SKjSsLMJTi2QEEIjYq5jSBGZmFJMhymMx+nSW9Y4WqkurggDfXCLhLHBGcR19uhkwDAPWRsgD0Jp8QCJgS0R6O1qYQWQAjAwAEgsWsprja+8RzWcn2xuIa+naRFRAHMek5GUGmvDM3MdJGbUQB4HQHUVTfgZLqbsgENSaNIWekSSzoXCqYd6yXDPi20+8B1Ykl3AzfJMzwJZl6Qt9RkDJJN6OVGHbLpqxOwIK0TBITS4tNVV8Z8H4A2CU7CxZk3Lx50gpd4xqB29L9WPWJ4dl0sTfibm1kXQA1RDhkBskSMPJdyizKNCI0pLHACMrtwu9VFmaAe8kjgm4is/UwyHEwnjfhq+I6DFZYIDInDkN4KcHu+nzhsENdh+/En/qAIPhRZOZu27FDZMp1SOIVngKB9Ma3C9CN8kjAIQcsTA0iP698/S6gF8yVIpMAmSMZyyz8vIp+OyFWsrE9U/t5w/MyuCDmpKu6R8A2vYQTdKK7EEfVVtckAJBroR5LwWIcA0BLRzCtIa42f8IPEfr1STYqMZaE399TqzpIwwdBrnVXvSEZ93YkkNr4qajB5FpBfGM48swm73kA3Wi2e2LzxoTwd+Chuk7GbnAK/0ZOYEfhT+BEkGewvs4bdAxupDppDCVTekEghgCCnYSP/Ap/1ACgiK3S4sE0WHsSAo5g+e+k3D0d0yBggxW+OTrCHzUAaI1hKRD4vWVnMxis1+wzNiaFv2PyR9VxB3fgZRG+LVl/nz9xEkEDxmW96CfBeoYngtnqSNfwVCcxjPGiwzim3YHknjCzaEEwpQBGjsLXRsZ/sbEDgJT/25d081x6u0BIMZt7iHAfBAM2jTpAaUlllkvmMSE2cjlk2jA68QFjSliTs7T7fGrXCaYf6+UMAMllu4D7F8LZS5xhqfR4q9wNvzh0AKiYVbIpkuNm4YpLd4sBD1BHuqYW46ywgTJ4EmESW/0Qbl0r4M1nki0h83mzEXJ+ZljejdIbWhQyJA4gXQ4jZJ/AQ+6nwjMuRaHkmUP5hlA4PBIojd9gVUY/9Gxzat4sgBBsETe9l5jpwaflBaGMYuiBZE/44Mmztn2URNN+XS1OG/QA1RdytVS5+Y6ZF7+ph125NEpCYdHBLYdLUZhPMib4BskhWJxEwnPf3/Zx9eGKK3e+esjwWoDS+i4fMcK4040GuRrkYbywqGRMGAIukIwGYBrWYTMPiH6FJPPwsLsAr7NcYW26FO5lyvSkF/4OEzdkbhnfLHM90oaN40MlkX6IOIMVH8RtM99HDVAJiaQtf2Z7zvADgHtuhBp1ZSaXz3woKokupWs+lpy52Ugm294gl0t5Lv3jyAyXbhOc3ZpqIxvrNifVLlVNyYW8hv5Oz3DhB4JpTc1VBtRPiJDPXkCueFE6Kei5BoxNtWHS93hlWAFA4d4x9OATWCb4wYbTHjzFKsILMiz9uXJy4O7i/uhgMf0jEwA20J1u8kfOZGrIdKyGfn46WBVD6CHPkzMCQOJ1qBCa5ZQu8WdJqUyYq1PN/yiY9+O0daDnBq3Ql3IFAM/d/LCjqA4HpfvOgIc4Iv/RFSl5IREKaaGy1PyOTK/eTjJc/Y+qLI8OcU/C9EQf5ge692i9ei2A6XlkMXUWuChLu8r1PEghcru/UhZDwO62kNhW+u/SMd9hRppxdTVh1XH2HfY8gICYTX+K035HjjwgAy+UqlmsLhkVz8yqpeo7NTlECTYXbdZpYKGmScmxzQNI+9W8AKWFMschbz15NIdIjAc8JNvDFPJZsOn+nm28mI6HqQSk5/GSYecA2Qy6ymaaosfibrduuJo2TcTU7wS5640GI/xdQIDUcLIc/8LvnzXM+DvVXJvuH04iHLZ1j5OHNVQktks/edT3liuHHQBIN49nJ47ADK9vjrwScGr4dgemq4TIhyD8/iBQZkuMJRCQ4PgQhT8gCFJtZsr66SE20dsZRmYWmjtXHtFMDie/zfsLX6QVPss1UtL3kT6IxsqUICV8xXvSCD/ndqV1B73CF3JnLRpGFjziqTwjRd4UJg2REZjZhoOD/VXdnzwhfBCMbrjvg1r6E/pYv/8N0C7LDxZ3fqn7+UPKbLvmj2Ax89FJCgQKwlr+yoRx2SdT6VvQLUykt2hquJPsfV9SSfYmBLhKePpmd3QU34/4PXq+Q+9NzjQEdo7J0S6UW0iTKTCRaN7Fq0q1rM7SS+zUMItO04+wlTPzYCH7KITqIu5QZKQiBcPzweBP8PuFMBM3Srbz0hFOkra582+usP1FJfSVaVKnqxSTE0BRkGH09jjyn2swX+zddgKu8BAwUotFqF4G5zeHDfOEnUwu8zSCW8Mz7pRqNpD0zTrTIHdQmmyC6bj693piCcY5AHZK+iitNV0wxwJ6ihWd90HAxBZZ7i5glnOv9DDbDy3RQ+2/YcpU+YwZIk1nTHdWPMrQ00kYsj01O2Is8D8EqG0Binw6EzF0J9v1cjXlEsxAYPne5ZOvIyD/O4XKQbU8znXRzOJFV4V7ilZ7Kgmk+oBCJhmKgwdjYK5Q8yz63DzfwUOMOwD0t15KgJJTGFOSAMLdJM0IqDOgJjOQJr1Odn2OI+XxBkfAFfJ9xmRbKEDf0QfRLo6eLiAR922EacgxEQToCa5Uk9JACGXlYXSRJWiJ96Ar3q0tAl1xK6HkIbrwaCSDTlIkX2YxK1Ypo3DV0i8SPIJRv19sDo8FdiGTbDwCgGXJKet108oFlHZAhmNArMgnVBr28tXe3ysFiZEdiMXVX1/bDFPuYIDHTnFSS8TKLAKCFUZ7qAidBAaVJCMdb6SvHhdJsnymra2eW5yAY0WJCiZTM2SDWf09x8i4AzOvwt8pq8D9l+H6QBAmPM/380qrDO7PAG5r9U2/GcC4KElNUIByq0gDwRbudp5iOggGqIFlPXBDri9RN3cRjAQIhhMAXTkLvz8QwFMaLfpIIE+ZV+U3x+O0EyX4vmghlctnoYT/b7JiwjWGRPB7QaDoEBtjAKhj/uxeNhy2Qw7GmoyXIlP7GEi2W+3iPs2sHGsW4L+ocS4KMwTzBCVYYw0AFoapUoWSv1KY1VkAQKEUAFAoBQAUSgEAhbIHluGMAn5BAeD7AIxCt454UcMP59PfU8YSAO6m14cF2eStlA8HAIbTBcxAYaXYyJftY8PVY5MDFEAwssIfFySwAIJx06fmiFZ4Dx8VcKSJuBfS78NGAgHmjjmFMkcctXsQCPR+qNTexkQlOtwyVAXbUWM1aju7JT4VbXY5Ss0O1NDnvisf/c4Z+TmBewAI1L6lHkW/G5NT0WNHcHjVJ7ho6i+wqPRdzAi2gJkOGpKT8U7sIPy24Ty82XoAyq1O1IVb/Wly2TpIjncATGAQcCaQ8CxsiNfBoPcLK9/GxbVP4yuzn0PAbEtNkSmmC20cEtmEQ6Z/gKunv4F7N5+Ee9aegbda9keZ1Y36UEt6iyAnggWYYCDwzbxElxfBxmgtKgJduGD6s7ii/jGcGFxB0bmaGxgBumsgk1KnxRh3IIUNeGGwgMQV8+7HFTOW497PF+OedWfgjy0HaCDUERD0BCKZv2VvZl57L0cQSD2vPrWfsF4rIMeAtkt9sskWMuUd5MunhzfhO3N+hUtnPY2Dp7xHjI8u2loO2UWkr0ik1vD1X+dHn7lhoHM29XwUl+93Py6fuRz3rT8Fd392Dj7onIUZ4SbtUvLFD8y892QGECgTGvWC2Jyo0f0UDMT0NOA4aY1peKgnMhWETb42v8MXShiKzTckauEIC0dVvIcLa5bhnOKXUFe31p8CE6sCElKffdS3eDOrGVFAIKB0EBConZft+wAu2+sx3Ljyevx4zbmYV7IRnpyoAOgHApN5iIkQ1sbrMTXQjr+e9jCOm/Yuar0OyJiJ9U4lXmw5Gk92noJu8qdzAw3U5+6IA8GgeqkQbl18GiJmAieVvomvznkC59UvI1TEgdYA0DMJMqSGPgRhNUuIl2mxbi8QlEWIbMMPDv45nth2BLYlKjA52JEXK2COmk2lPrG4i9XJOpiS41tTl+Kamscwb9pbwCT6njgU2ulF/XNp8cN4e8uhuCt+OR6Onk2i9zDb3KC1UwwzEAy6Y5QA2RCbjnKzC1fOWIrLJj+JY4tfA8rUFSWQnVRBh54bFAMxtclkFk6Tah1/0FlOQGiE7D0FZOdVwIjWAxVryK08i699cC2mhNr73OCEBIAy+Z8np+DgcAN+OusmHFlOHSyJPMWqyY+SQ40FgaQ6M49EbHfjyKIPcGTpB7iw5yn8rOsqvBo/GhazMdPcuNtA6CV2HW4pNsdqUB1oxWUzf49rpj+EL1b+0ffvnWWQPYTGsBjYzPtyO0t64kHNCNXU96QVZZ55DUri9+lFMeluYRfholnL8NN1X0JbshRlgejEBYAy+2pt35Nz/gnVlSspZNrLH0gOdfTTKqH1Us83po9PL34Rpxe9iCeip+IX3V/Fi4njyCUMDQi95LLRrkJrogpzitbje/vdhUuqn8B+VX9Si/6Alkq6ihy9dHLz7/QbGcM1cOV/9lVFHZnnmRHpsd+ANa5nTKxIazi6OYKR/8VZk1bgpoYrJi4AlPavo9j5uqmPorr0Q2r43NwDX8fXsLNLluPsyHI8qYFwKV6IL9D3nUmuIUBoyQYEFb/bXgAbkzWwpYXDyv6EG/e6CxdNfgbV0zaSttNFXWSJwup4Gzf3YzhV9JZk/0qs8cYdLEFqIwHpgzkR+r40AivStlUtIKFwcG5oW99uYxMSAFEiVxVmJ74z5THqk+DgEwRyOxC+TED4MgHh6dgpuK/nfDwbO5H6P4DZgc93AYICSLdbhPXxWq1dZ05+CRdUE6Of/CqMSiIcPWRpuonYxXt3ucxV8KntWyS7h4zRlVl3RzRkLbiT9t7+EnhB9XQmUCo4jfY3EPH7eyJ99WVk+uMzhp4l2gEIZxY/jzMjz2NF/Cjc1XU5AeJkDYQ5BATFFZqSVWikGL4+sgXfJN9+xYzHcETlO/5ZJW6EiF2NOuqUyNogFmNL3zvBZRAx8xkyLacj2/a5amWQ6b7P1HpImS7kVGvNJZKS+yHlRARAlOL6SrMD1035PWl/CMOy+LkXCFQWFr2lX6/FjsTPCQiPx05FMlGM+WUf429m3YdLJy3DzJpVPrWIVUBGA7rTYYjBP1NxBI/Cgm7+EpI4ApbM3BSNb2mzmHUjpJU5LLQZVrYfiLAZn3gA8LW/Bt+tWYq6snd30P5hLCkgLCh6GwvCb+O5joVYU7w/LtvvcZQGtxCpI83qmULK6PhL1Ye6+azWfMyUCfmK4qA6ISSzAmYNPepMZhsb9fHq/S2FqktoE9Y0HYNHW09ErdU08QCg4usKiq2vm/zEDr5/hNK8KTe7uGgFFs8mzhWi51H8Lm1qsrWbe274Pv9AGedv6MSAOeDt3uWuXCg5i2vBGzIN8Fy13Rhuab0QHaIE9bwJXh52QOF51f5ELS6oXIHa0vcoLp6CvIx4qM2WYqUUxZWkOn13BJ96eexkKdlKel8yIHWR8m0mvKPpunjWG1uN2Nx9BJZ2LsLs4Oa8CD+vAIgLCxEjhu8q368ITrYGmn2sGmOqaK7Br5AJ43kCUzArUPQOT+JJ5rlHgXF3wBvTJT9rOU8no4p4YmJFASruXkva/81Jz2Ju2VsUC9engma2E0PW8bYSfKdxlUzKhXqHaM6foc8fIZI1eLhK9CWQdjutrnx+At8n3P5owF7ziM8Xub+E7X4DCTbASgml/Vuxqftw/LrtdMwinuLlcfOrvAAgSdpfaXTj23VLiTmTTdY7actdQiS1V5pI8FfhBI7VAlMpUxiXyHDoNFYTvRwRMXgLrgCgtmVxd0fzFTD5HVKwb0EMtHef2tpG/DMLeP/in/7OkJP2N12ANrcMtYHmiQeANrccX4x8jL2LKO5OqL2BWtL2gwyYN0CQ8I0dQOGqnbQCX0WkspFFW67XcbsxCAugs3C7QzYlSPCP0pslA8pS7RnoiasJyHdDIKfzEmBtwcauI0j7v0Tavymvws8bAHq8EGaGKQQLkB23q/RBY+njZH6+fyLEjp8zrcayy/h/SFR/xozQPfqoSZ5jB6trRU8qjz+IztWEjwWRNF4k1n5sdoz47ovBPYsa93Tu7kZq5v/T5gvR7pWhzmqemADQ2q20UA2n2kCmHXJkkoI3O42cUlvMysrQ3Ug6n7HGzlfQnYN5VTK3yFzsZQ3OAqjnx1FD0nhFMr7PAKf1qCRSlMz+ibDlO+Bmjs/yff/6ri/i3vbTiPnnX/vzBoBiCn8bvFoSSJkeVWNehoM04vwRCe9gHSfvcs4AdVgiqRTtZRaQdTg4sUVNvRsg+UJxv8rvB3PbX6130IazOdJh75C/r0pblx2FKNDGg97hEqJBDV8PSivI99/eskRPIa8PNE1cAFRYXfhw83ysPXUG5tSuRlofoLmVvEW+Ef4aYnwvPa8uXcervPvkqpf4gqZ5elDFGAAELdTEN3LYdFenduk/ST5fJtjrdN+KrG5GjxfJzXTnY+j9+sGFGSrn34iWngPwYPtJmGFtHhXh5w0AIZ7E2vgc3Lv+JPxgn4+JFCTSd6yEy6udY8Tm8nVEFov15Iv+glNZPOHtK35X8Qzf0noGWrzMrl25k3r68oBUKOZlqaTK69tskezhzxPlMHUuIhuwuPwIrjyBUNA+JHpp2Li1+QJssydj/6LVBABj4gJADcnWlW7GIyuW4Ppzfoniumhmhdkv3sw/Y4eL5RUfISlDWit3ie1JkkWB02V95W3svNZrUZ7BWijwKK6gdi2ozM73KGT7ikwYD/XF/DKbpcADLORegnYDg5eb0v5taO45EPe0nokZOus3elsq5M3uVIQ7saZtbzz86pf9BRPNyjz3e/V+VhH7lM3sXAjlv9NlAxUfUFuwRqy/kx2l38Ia+uwTen3U76V2K9hGGA+xrPKQHvu27MFDfaneLNcyIW5iUl4i+VAzS7JP+5ucapQYsVFNbuZtMEjNqS+f1Ir7lp2PK5sfhM6Me5mzbizUs5KZxleEF3kYgTTj53oyrgP5ceQO+m4tm9exbJfzOVjKAngsQ9ipF2GonU2uxkDH4KoTPDzvWgLA7UI9fEh238/5N3YdRNp/Bmn/plHz/XkHgIqS1ULJN5q+gBV1R2PhYX/Mnp1TAuKdj7APzLnyL8EfotTd1RSrUkogiIf/wGaI/VAbWKWOrNs+hYs6dxX92aK2qO93b8E4af5zdJ+Tcjq6VogLSfOX7s5UbZZi/rdS3N/sTBpV3593APjiIN2xPPzXJ3+FhWq2bQLZ2bkyud1tP4KcNFfa5uUIZZhNG3YhXip7kxebh8KIfY4k2y7oCN9Z+Np6yCrZY7xM7uXAAZ2gwWxmOaegh6+QuzV8rbS/BVtaD8av2k5Paf/ob6eUVwAoMjijfBOe/ehErJ9UjxmTN/VN4MhoBUqo2w9sv0K2TDoA7fwwWCL9hSG7QrTFV/LjW6ZgH2w/TeKtcmAd+Yag3Ws6psoe9j59X5uD2YozVx6GYrlqOJJhatbRHRT3N5Pv39/6y54HAB0SIon2+CQ8WHQuvrfo9uwA6JOvC/7nzsWisaKBGHhJ2unZ6qTKoFktNlQv49w6VR00BTW5M0EPsJzesfy5UrAVREhqBzzQTaCZeeJ4sgCr0ueuB8m1g83o6pmJ37YuxrRRZv6jCgBlBaZM2qajge9Gf078zskNBIF4Kzf4cSJZ9pFOEok0UismF7E5sFg24A42p/lvUZIEotXkIqAGoY4SKq9voiir8EnYjBNzEN4iAkojzN0naUyRHdL+n2z8GjYla8j3r9lzAaDKpEAbPt66P56KLMaShc9Aj/UPONKmahv9H9bAzpHvlDyOsjQhhGL7xAekw7+FCmMNmx+6Ha+RADv42RTnP+4fWpw9wcOC3gq6zyl6VILtvuiZOiWsrBMNWw/BzZsvwezQpjEj/FEDgCLpkXA37l17AZbsTQBwqBpubprGOpwnwOQ/yGjgZpTY6dPK5QLyz5Hb2Kqit1lxokoI9rh/xOcA2T2HL2WlzoVS5fTVRI6hThhVoR2PgRXFtKV6r/FwfGft/0eQ23q2jyf5Hg4AEsa0is14/oNj8f70k3HYQWqeQHluP66nX8/GLRTazZWf8av1dO7+q2iUe1DHsojudxDlfs5gQGHK24jwfXvo/p7pAx9h9pC/j6lDj/DM5tPwm8/PxYsdC8n4uFr7bTm2Dj8avcWhUsBmQdzTeSIOC79ANenKfTxFnzVpfkN2T5qDSvMkyDQHlegZRQNomkxpuRD/SO9u0mexDEXw6o/VpneDiSer8dCGJXig6Uy83v4FfcVMErzFnDEn/FEFgFoYOmvKJjy+8kv4500/xVSjyR+8yZlYU2QwufVk4VStRsDYyz+scbAoVGe/ekuY5z0++GPJUucDW83kzyQ2ds3C/Z+dg0faT8fH3fNQYnRhTmgDYdA/4FKM0X25zdF8eETE0NA1G789dQm+e9HPfQB4uVsBeA54U+cx4g9VTbDswY1sEOdgFfZhSIgP1Wqc3P0X849/DZPGF1HQEZ+N/1h7OZY2nk7v6zA5uA3zI6v7Nn0ScmxvyD6qAFC7fMyg0P7O96+ARcL8m8pfw1DZPrUxhJ1D0k3JrSvezFq7T5OTipchmOOiSia7yN8vIg3+MOeZ5yRIpgZuQj261z5qPQy/XX0mHm05HetJ8NNCm7F/8SpN8MQ42g3LHO0KlEW60d5Rimsf+zF+E7wA19bcg8sO/Z0/fKt2CRloiZwaOJrfuZyI4N/KtvAdmgGyLAv0pGwgvTyefrghlzmF2swHiJ8UE89IhvD7rWfj/uYva//e6pZjWnAL9i/xs3qeHH/HL4w6ABzPRIkVxf61n2CdPQ2Xt96KXzVchMtm/w5fP+vB3D1ytPtO3B9UMr0DJsMu07fVObTCfZP8/WIYRjQ3Yteik0g9TjXuX3cWHmw+E291HUqYczE9uBVTg03axI+luH7cAaA3LFSdWGs16tdHf5mP194/Cnc/dQmuPPVBXHnSAwNvFSeUiRZ3whGfSNe4gUCwKLVtl3rC58xwf8UC7g+lGh42WWYz3+vf6c/arn1x3/qz8fuWxfhT9z4oD3Rg73CDPudUjAP/Pm4AsD1B5AumvmILEbTNWLNhFq665Rbc8/TF+DoB4a8XPwjOvUyEwjfxjreCWViBYl6DTllHqIhLQ/yvyjf7kzhYWmLHeJJIHTH6IPD2tiNx77oleKrtJGxNTsFUAuX84k/9Y92V4CfQtqfmWKxUb0fXVJJFqNqGz7bOxDduuxn3LL8YVxIIrlz8gN47ML31Zn40wLGV/rt1p0NoZX8GSYI3O3UYp2z9441n48FVZ+C51mPR40YwI0T+nQSviZ2cmMcrmWO5choIcjsQGrZOxzdv/0kKCA/hqtPu13G27wJy3Wc3RezUXr7FSbS3TcHvNpyKh1qJ2HUeDlM6mB7aCot8vO/fJ/a5WuZ4qGQvEKZWNqGmqhGfN07DNbffhF/+4RJ878I7cOGCJylqUCtOksg8S5Np460zdhGgtaMOd334V/gNsfq13bNQRkx/n/C6Pk4i5J5xoJo5nirbB4SKJtSSVVjfVI+Lf/Kf+O83z8c3jnkI50ReJl8e912AFfDJnlqvF0ho365Cxk9b5uPXG5bgiZaT8WnXLEwNNZN/X93ndva0Yo7HSithqb1066p8M/3GyqPwyjsLcMzslTir5CV8sfxPmGk0Iph0NBlojpfgz/HpeK79ODy19WQ9F7+WTPz80jX6XnuKtk8YAPRFfinBzZqyEYI4wMdt8/B68xdQGujGlEAzLO5vIdbmlKHZrtJsvza8rW861p4s+KEAYKDe8nw/K/O+ubvQo3rAlGALpqBFCzfmFqGH+VVW28TNCm/q24Z9PCdu+ge+6dlO7lurDAsA1AQP02C2aQkIx6BQXItl1HpG7fQdSbPN2nj28bI3wuUSnqOnraWdVM9IGCKQ+6qVnG2gYTobGBPxdOAKmA5iduTorc31FFZF9Bw4xgpnxw1nUcL3SLlEwkSoyFP/Pi6dqWUGASBhRIcdAJ3tk99ynPD/GOauwFMm1TJi14ecrkMSar0cZwWJjYANkB6DHQuq/v06kdfj02sqvWxj9bC7AK/Eekuw5EqS9pG7VM3j4IYbjEzq/MAMBW8QHn/X4FIUhDac8mfgARHizD4jEWVXqyNs0nk04XAYJfHXhh0AYau7jdjW/Z5r/t0u62NUllUNxqj1GaXJHwqX57zBdqEMgoQZZPpNT+1ZlMFPEMvxzCSzg8uG3QUUxdoQSbS/Z3jJN0QWMijcQmg1klYgo/BJC7nlobtH/mDb+mBi2C1AbGad5n9ceBeXdG9dn+wM+ay64O7HAkWk/3uwerzPi73kj4om5b7kPGcAxN+u9qfWC7HBZey88LSWR5maVVkw9aPvGvS5CCzRVD73eKssMjjoyBwluNPU+4CHWVe/cWGJFA+7tko7FMz+KOo+MXSxwQsVn/ppzeGrevc1kt8fZg6wUyl2QHTkEYLdfoJby1X2z2elonB0fF64QGoHTOpzycQvnWhonifMVUHX9tdZDuLAkSGOBUidcWKSrXKN4tMkix/Hk/b5JtgxMORMqmAEOW7lWCiDUnaVY+2U3FjNBXvZifGHWFHy09QOa0O66W4OBvln67jceN1w+ecc1ussaO/FXFHKpFqfXUgHDicAhNpFjcsWaZp/ho03KebvMnZzI+ycOUChTFQCWSgFABRKAQCFUgBAoRQAUCgFABRKAQCFsgeV/xNgABevLI9HPVBqAAAAAElFTkSuQmCC
// @grant        none
// @compatible	 Chrome
// @compatible	 Firefox
// @compatible	 Edge
// @compatible	 Safari
// @compatible	 Opera
// @compatible	 UC
// ==/UserScript==

(function () {
    var host = window.location.host;
    var getSignBtn = () => {

        let ret, p;

        if(host.search(/open\.cd/i) != -1) {
            p = document.getElementsByClassName('infos-bar')[4]
        }
        else {
            p = document.getElementsByClassName('userinfort')[0] || document.getElementById('sign_in') ||
                document.getElementById('bottomnav') || document.getElementById('sp_signed') ||
                document.getElementById('checkin')
        }

        if(p) {
            if(host.search(/hdchina|hdcity/i) != -1) {
                ret = p.getElementsByTagName('a')[1]
            }
            else {
                ret = p.getElementsByTagName('a')[0]
            }
        }
        if (ret) return ret

        ret = document.getElementById('modalBtn') || document.getElementById('showup') ||
            document.getElementById('sign_in_span') || document.getElementsByClassName('faqlink')[0]
        if (ret) return ret

        return ret
    }

    var isSignable = str => {
        return str.search(/签\s*到|簽\s*到|打\s*卡/) != -1 && str.search(/已|成功|查看|記錄/) == -1
    }

    setTimeout(function() {
        let btnSign = getSignBtn()
        console.log(btnSign)
        if (btnSign && (btnSign.innerText && isSignable(btnSign.innerText) || btnSign.value && isSignable(btnSign.value))) {
            btnSign.click()
            console.log('Signed.')
        }
    }, 1000)

  })();