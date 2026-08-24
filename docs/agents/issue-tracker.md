# Issue tracker: Local Markdown

Issues, PRDs, and Wayfinder maps for this repo live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- The PRD is `.scratch/<feature-slug>/PRD.md` when one exists.
- Implementation issues are `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Triage state is recorded as a `Status:` line near the top of each issue file. See `triage-labels.md` for the role strings.
- Comments and conversation history append to the bottom of the file under a `## Comments` heading.

## When a skill says "publish to the issue tracker"

Create a new file under `.scratch/<feature-slug>/`, creating the directory if needed.

## When a skill says "fetch the relevant ticket"

Read the referenced file. The user will normally pass its path or issue number directly.

## Wayfinding operations

- A Wayfinder map is `.scratch/<feature-slug>/MAP.md`.
- Decision tickets are `.scratch/<feature-slug>/tickets/<NN>-<slug>.md`, numbered from `01`.
- Each ticket starts with `Type:`, `Status:`, `Assignee:`, `Parent:`, and `Blocked by:` metadata. A time-dependent ticket may also include `Available after:`.
- `Type:` is one of `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
- `Status: open` is unresolved. `Status: resolved` is closed.
- Claim a ticket before working it by setting `Assignee:` to the active agent name. An empty assignee means unclaimed.
- `Blocked by:` contains repo-relative ticket paths, or `none`. A ticket is unblocked only when every listed blocker has `Status: resolved`.
- The frontier consists of open, unclaimed, unblocked child tickets whose `Available after:` date is absent or has passed, in filename order.
- Record a ticket's answer under `## Resolution`, set its status to `resolved`, and append a one-line named link under the map's `## Decisions so far`.
- The map is an index. Detailed decisions live only in their tickets.
