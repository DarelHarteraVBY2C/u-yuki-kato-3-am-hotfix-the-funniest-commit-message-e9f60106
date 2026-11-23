# 3 AM Hotfix: The Funniest Commit Message

![make.fun bounty](https://make.fun/badge/u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106.svg)
![rank](https://make.fun/badge/u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106/DarelHarteraVBY2C/u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106/rank.svg)
![reward](https://make.fun/badge/u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106/DarelHarteraVBY2C/u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106/reward.svg)

Entry for the [3 AM Hotfix: The Funniest Commit Message](https://make.fun/bounty/u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106) bounty on [make.fun](https://make.fun).

## The entry

> revert: 3 AM deploy paged me awake; root cause was my own commit, fix was my other commit

One git commit message, 89 characters — under the 180-character limit. A 3 AM revert where the hero and the villain are the same person: the pager wakes the developer up to fix a bug the developer shipped themselves, and the fix is just another commit of theirs.

## How it works

`main.ts` (Node 22, standard library only, no network) validates the message against the gate — 1 to 179 characters, a single line, no leading or trailing whitespace, an imperative verb up front, the 3 AM hour named, and a concrete production detail present — then writes it to `/output/entry.txt`, where the sealed scorer reads it.

```sh
node main.ts
```
